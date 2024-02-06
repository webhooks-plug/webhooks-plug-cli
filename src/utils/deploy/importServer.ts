import {CLIError} from '@oclif/core/lib/errors/index.js'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../shared/constants.js'
import Processes from '../shared/processes.js'
import {checkDirectoryPresent} from '../shared/utils.js'
import Listr from 'listr'

const handleServerImport = async (ctx: any, task: Listr.ListrTaskWrapper<any>) => {
  try {
    const serverDir = `${WEBPLUG_GLOBAL_DIRECTORY}/server`
    const directoryPresent = await checkDirectoryPresent(serverDir)

    if (!directoryPresent) {
      await Processes.run(
        `git clone -q https://github.com/webhooks-plug/webhooks-plug-server.git ${serverDir} && cd ${serverDir} && rm -rf .git`,
      )
      await Processes.changeDir(serverDir)
      task.output = 'Installing package dependencies...'
      await Processes.run('for dir in functions/* layers/*; do (cd "$dir" && yarn); done')
    }

    return
  } catch (err: any) {
    console.log(err)
    throw new CLIError(err?.message || 'Server repo could not be cloned', {
      exit: 1,
    })
  }
}

export {handleServerImport}
