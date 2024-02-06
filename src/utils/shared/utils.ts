import {fromIni} from '@aws-sdk/credential-provider-ini'
import FileUtils from './fileUtils.js'

const getCredentials = async () => {
  const credentialsProvider = fromIni({
    profile: 'default',
  })

  const credentials = await credentialsProvider()

  return credentials
}

const checkDirectoryPresent = async (directory: string) => {
  const directoryPresent = await FileUtils.fileOrfolderExistsSync(directory)
  return directoryPresent
}

export {getCredentials, checkDirectoryPresent}
