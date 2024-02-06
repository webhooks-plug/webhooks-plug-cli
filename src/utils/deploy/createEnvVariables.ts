import {CLIError} from '@oclif/core/lib/errors/index.js'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../shared/constants.js'
import {checkDirectoryPresent} from '../shared/utils.js'
import FileUtils from '../shared/fileUtils.js'
import {APIGatewayClient, GetApiKeyCommand} from '@aws-sdk/client-api-gateway'

const createClient = (region: string) =>
  new APIGatewayClient({
    region,
  })

const retreiveApiKey = async (client: APIGatewayClient, apiKeyId: string) => {
  const getApiKeyCommand = new GetApiKeyCommand({
    apiKey: apiKeyId,
    includeValue: true,
  })

  return await client.send(getApiKeyCommand)
}

const handleCreateEnvVariables = async () => {
  try {
    const uiDir = `${WEBPLUG_GLOBAL_DIRECTORY}/ui`
    const deployDir = `${WEBPLUG_GLOBAL_DIRECTORY}/deploy`
    const deployDirectoryPresent = await checkDirectoryPresent(deployDir)
    const uiyDirectoryPresent = await checkDirectoryPresent(uiDir)

    if (deployDirectoryPresent && uiyDirectoryPresent) {
      const outputsJson = await FileUtils.getFileContents(`${deployDir}/outputs.json`)
      const outputs = JSON.parse(outputsJson)
      const region = outputs.WebhooksPlugLambdaStack.AWSRegion
      const apiUrl = outputs.WebhooksPlugLambdaStack.WebhooksplugAPIurl
      const apiKeyId = outputs.WebhooksPlugLambdaStack.WebhooksplugAPIkey

      const client = createClient(region)
      const response = await retreiveApiKey(client, apiKeyId)
      const apiKey = response.value

      const ENV_VARIABLES = `VITE_REACT_APP_API_KEY=${apiKey}\nVITE_REACT_APP_API_URL=${apiUrl.slice(0, -1)}`
      await FileUtils.writeFile(`${uiDir}/.env`, ENV_VARIABLES)
    }

    return
  } catch (err: any) {
    console.log(err)
    throw new CLIError(err?.message || 'Environment varaibles could not be set.', {
      exit: 1,
    })
  }
}

export {handleCreateEnvVariables}
