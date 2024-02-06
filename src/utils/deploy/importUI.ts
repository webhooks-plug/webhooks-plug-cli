import {CLIError} from '@oclif/core/lib/errors/index.js'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../shared/constants.js'
import Processes from '../shared/processes.js'
import {checkDirectoryPresent} from '../shared/utils.js'
import Listr from 'listr'

const handleUIImport = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  try {
    const uiDir = `${WEBPLUG_GLOBAL_DIRECTORY}/ui`
    const directoryPresent = await checkDirectoryPresent(uiDir)

    if (!directoryPresent) {
      task.output = 'Cloning webplug UI from github...'
      await Processes.run(
        `git clone -q https://github.com/webhooks-plug/webhooks-plug-ui.git ${uiDir} && cd ${uiDir} && rm -rf .git`,
      )
      await Processes.changeDir(uiDir)
      task.output = 'Installing package dependencies... This may take a while.'
      await Processes.run(`yarn`)
    }
    return
  } catch (err: any) {
    console.log(err)
    throw new CLIError(err?.message || 'UI repo could not be cloned', {
      exit: 1,
    })
  }
}

export {handleUIImport}
