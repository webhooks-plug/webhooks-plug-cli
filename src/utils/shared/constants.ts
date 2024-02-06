import {QuestionCollection} from 'inquirer'
import {homedir} from 'node:os'

export const WEBPLUG_GLOBAL_DIRECTORY = `${homedir()}/.webplug`
export const WEBPLUG_DEPLOY_DIRECTORY = `${WEBPLUG_GLOBAL_DIRECTORY}/deploy`

const Proceed = {
  yes: 'yes',
  no: 'no',
}

export const deploymentQuestions: Record<string, QuestionCollection> = {
  DEPLOY_NEW: {
    type: 'list',
    name: 'proceed',
    default: Proceed.yes,
    choices: [Proceed.yes, Proceed.no],
    message: 'Do you want to deploy a new webhooks plug infrastructure? (yes/no)',
  },
  DEPLOY_UPDATE: {
    type: 'list',
    name: 'proceed',
    default: Proceed.yes,
    choices: [Proceed.yes, Proceed.no],
    message: 'Do you want to update your aws credentials? (yes/no)',
  },
  ACCESS_KEY: {
    type: 'password',
    name: 'access_key',
    mask: '*',
    message: 'Please enter your AWS Access Key ID: (Leave empty if you are not updating)',
  },
  SESSION_KEY: {
    type: 'password',
    name: 'session_key',
    mask: '*',
    message: 'Please enter your Session Token: (Leave empty if you are not updating)',
  },
  SECRET_KEY: {
    type: 'password',
    name: 'secret_key',
    mask: '*',
    message: 'Please enter your AWS Secret Key ID: (Leave empty if you are not updating)',
  },
  REGION: {
    type: 'input',
    name: 'region',
    message: 'Please enter your AWS Region: (Leave empty if you are not updating)',
  },
  DATABSE_CREDENTIALS: {
    type: 'list',
    name: 'proceed',
    default: Proceed.yes,
    choices: [Proceed.yes, Proceed.no],
    message: 'You need to set up your database credentials. Do you want to do that? (yes/no)',
  },
  DB_USER: {
    type: 'input',
    name: 'db_user',
    message: 'Please enter your database user:',
  },
  DB_PASSWORD: {
    type: 'password',
    name: 'db_password',
    mask: '*',
    message: 'Please enter your database password:',
  },
  DB_NAME: {
    type: 'input',
    name: 'db_name',
    message: 'Please enter your database name:',
  },
  DB_HOST: {
    type: 'input',
    name: 'db_host',
    message: 'Please enter your database host:',
  },
  DB_PORT: {
    type: 'input',
    name: 'db_port',
    message: 'Please enter your database port:',
  },
}
