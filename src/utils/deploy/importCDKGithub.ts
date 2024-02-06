import {CLIError} from '@oclif/core/lib/errors/index.js'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../shared/constants.js'
import FileUtils from '../shared/fileUtils.js'
import Processes from '../shared/processes.js'
import {checkDirectoryPresent} from '../shared/utils.js'
import Listr from 'listr'

const createGlobalDirectory = async () => {
  const directoryPresent = await checkDirectoryPresent(WEBPLUG_GLOBAL_DIRECTORY)
  if (!directoryPresent) await FileUtils.createFolder(WEBPLUG_GLOBAL_DIRECTORY)
}

const handleDeploymentGithub = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  try {
    await createGlobalDirectory()
    const deployDir = `${WEBPLUG_GLOBAL_DIRECTORY}/deploy`
    const directoryPresent = await checkDirectoryPresent(deployDir)

    if (!directoryPresent) {
      await Processes.run(
        `git clone -q https://github.com/webhooks-plug/webhooks-plug-cdk.git ${deployDir} && cd ${deployDir} && rm -rf .git`,
      )
    }

    return
  } catch (err: any) {
    console.log(err)
    throw new CLIError(err?.message || 'CDK repo could not be cloned', {
      exit: 1,
    })
  }
}

export {handleDeploymentGithub}
