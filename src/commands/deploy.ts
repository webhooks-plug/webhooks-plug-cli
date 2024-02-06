import {Command} from '@oclif/core'
import {createPromptModule} from 'inquirer'
import {deploymentQuestions} from '../utils/shared/constants.js'
import {spinnerInfo, spinnerSuccess, updateSpinnerText} from '../utils/shared/spinner.js'
import Processes from '../utils/shared/processes.js'
import Listr from 'listr'
import {handleDeploymentGithub} from '../utils/deploy/importCDKGithub.js'
import {handleUIImport} from '../utils/deploy/importUI.js'
import {handleDeployment} from '../utils/deploy/deployCDK.js'
import {handleServerImport} from '../utils/deploy/importServer.js'
import {handleCreateEnvVariables} from '../utils/deploy/createEnvVariables.js'

interface IAWSCredentials {
  region: string
  access_key: string
  secret_key: string
  session_key: string
}

const createAWSCredentials = async ({region, access_key, secret_key, session_key}: IAWSCredentials) => {
  updateSpinnerText('Setting AWS Credentials...')

  if (region) await Processes.run(`aws configure set region ${region}`)
  if (access_key) await Processes.run(`aws configure set default.aws_access_key_id ${access_key}`)
  if (secret_key) await Processes.run(`aws configure set default.aws_secret_access_key ${secret_key}`)
  if (session_key) await Processes.run(`aws configure set default.aws_session_token ${session_key}`)

  spinnerSuccess('Credentials saved successfully')
}
const prompt = createPromptModule()

const setDatabaseCredentials = async () => {
  const setDatabaseCredentials = await prompt(deploymentQuestions.DATABSE_CREDENTIALS)

  let [dbUser, dbPassword, dbName, dbHost, dbPort] = Array.from({length: 5}, () => '')

  if (setDatabaseCredentials.proceed === 'yes') {
    const responseCreds = await prompt([
      deploymentQuestions.DB_USER,
      deploymentQuestions.DB_PASSWORD,
      deploymentQuestions.DB_NAME,
      deploymentQuestions.DB_HOST,
      deploymentQuestions.DB_PORT,
    ])

    const {db_user, db_password, db_name, db_host, db_port} = responseCreds

    dbUser = db_user
    dbPassword = db_password
    dbName = db_name
    dbHost = db_host
    dbPort = db_port
  }

  const envs = `JSII_SILENCE_WARNING_UNTESTED_NODE_VERSION=true DB_USER=${dbUser} DB_PASSWORD=${dbPassword} DB_NAME=${dbName} DB_HOST=${dbHost} DB_PORT=${dbPort}`

  return envs
}

const returnTasks = (envs: string) => {
  return new Listr([
    {
      title: 'Importing CDK code from Github...',
      task: handleDeploymentGithub,
    },
    {
      title: 'Importing UI code from Github...',
      task: handleUIImport,
    },
    {
      title: 'Importing lambda functions...',
      task: handleServerImport,
    },
    {
      title: 'Deploying CDK code. This should take about 15 minutes...',
      task: (ctx: any, task: Listr.ListrTaskWrapper<any>) => handleDeployment(ctx, task, envs),
    },
    {
      title: 'Writing env variables to UI...',
      task: handleCreateEnvVariables,
    },
  ])
}

export default class Deploy extends Command {
  static description = 'Deploy the webhooks plug infrastructure to your AWS Account.'

  public async run(): Promise<void> {
    try {
      const response = await prompt(deploymentQuestions.DEPLOY_NEW)

      if (response.proceed === 'yes') {
        const responseUpdateCred = await prompt(deploymentQuestions.DEPLOY_UPDATE)

        if (responseUpdateCred.proceed === 'yes') {
          const responseCreds = await prompt([
            deploymentQuestions.ACCESS_KEY,
            deploymentQuestions.SESSION_KEY,
            deploymentQuestions.SECRET_KEY,
            deploymentQuestions.REGION,
          ])

          const {region, access_key, secret_key, session_key} = responseCreds

          await createAWSCredentials({
            region,
            access_key,
            secret_key,
            session_key,
          })

          const envs = await setDatabaseCredentials()
          const tasks = returnTasks(envs)
          await tasks.run()
          spinnerInfo('Deployment is complete. Run whpcli ui to start up your UI dashboard.')
        } else if (responseUpdateCred.proceed === 'no') {
          const envs = await setDatabaseCredentials()
          const tasks = returnTasks(envs)
          await tasks.run()
          spinnerInfo('Deployment is complete. Run whpcli ui to start up your UI dashboard.')
        }
      }
    } catch (err: any) {
      console.log(err)
      this.error(err.message || 'An Error Occured', {
        exit: 1,
      })
    }
  }
}
