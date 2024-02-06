import {Command} from '@oclif/core'
import {WEBPLUG_GLOBAL_DIRECTORY} from '../utils/shared/constants.js'
import {checkDirectoryPresent} from '../utils/shared/utils.js'
import Processes from '../utils/shared/processes.js'
import {spinnerInfo, spinnerSuccess} from '../utils/shared/spinner.js'

export default class Destroy extends Command {
  static description = 'Destroy the webhooks plug infrastructure on your AWS Account'

  public async run(): Promise<void> {
    try {
      const deployDir = `${WEBPLUG_GLOBAL_DIRECTORY}/deploy`
      const directoryPresent = await checkDirectoryPresent(deployDir)

      if (directoryPresent) {
        spinnerInfo('Destroying webhooks infrastructure...')
        await Processes.changeDir(deployDir)
        await Processes.run(
          'JSII_SILENCE_WARNING_UNTESTED_NODE_VERSION=true cdk destroy --all --require-approval never',
        )
        spinnerSuccess('Webhooks infrastructure destroyed successfully')
      }
    } catch (err: any) {
      console.log(err)
      this.error(err.message || 'An Error Occured', {
        exit: 1,
      })
    }
  }
}
