import {Command} from '@oclif/core'
import {checkDirectoryPresent} from '../utils/shared/utils.js'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../utils/shared/constants.js'
import {spinnerInfo} from '../utils/shared/spinner.js'
import Processes from '../utils/shared/processes.js'
import {default as open} from 'opn'

export default class Ui extends Command {
  static description = 'Spin up the webplug UI dashboard'

  public async run(): Promise<void> {
    try {
      const uiDir = `${WEBPLUG_GLOBAL_DIRECTORY}/ui`
      const directoryPresent = await checkDirectoryPresent(uiDir)

      if (directoryPresent) {
        const url = 'http://localhost:5173'
        await Processes.changeDir(uiDir)
        spinnerInfo(`UI dashboard is running at ${url}`)
        await Processes.run('npm run dev -q')
      }
    } catch (err: any) {
      console.log(err)
      this.error(err.message || 'An Error Occured', {
        exit: 1,
      })
    }
  }
}
