import {CLIError} from '@oclif/core/lib/errors/index.js'
import {WEBPLUG_GLOBAL_DIRECTORY, deploymentQuestions} from '../shared/constants.js'
import Processes from '../shared/processes.js'
import Listr from 'listr'
import {checkDirectoryPresent} from '../shared/utils.js'
import {createPromptModule} from 'inquirer'

const prompt = createPromptModule()

const handleDeployment = async (ctx: any, task: Listr.ListrTaskWrapper<any>, envs: string) => {
  try {
    const deployDir = `${WEBPLUG_GLOBAL_DIRECTORY}/deploy`
    const directoryPresent = await checkDirectoryPresent(deployDir)

    if (directoryPresent) {
      await Processes.changeDir(deployDir)
      task.output = 'Installing package dependencies... This may take a while.'
      await Processes.run(`yarn`)
      task.output = 'Installing AWS CDK... This may take a while.'
      await Processes.run('npm install -g aws-cdk')
      task.output = 'Bootstraping AWS CDK... This may take a while.'
      await Processes.run(`${envs} cdk bootstrap --all`)
      task.output = 'CDK bootstraped successfully'
      await new Promise((resolve) => setTimeout(resolve, 500))
      task.output = 'Deploying Infrastructure... This may take about 15 minutes or more.'
      await Processes.run(`chmod +x ${deployDir}/bin/index.ts`)
      await Processes.run(`${envs} cdk deploy --all --outputs-file outputs.json --require-approval never`)
      task.output = 'Infrastructure has been deployed to AWS successfully.'
    }

    return
  } catch (err: any) {
    console.log(err)
    throw new CLIError(err?.message || 'Deployment could not be completed', {
      exit: 1,
    })
  }
}

export {handleDeployment}
