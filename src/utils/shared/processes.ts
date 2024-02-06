import {exec, spawn} from 'child_process'
import {chdir, exit} from 'process'

class Processes {
  static changeDir = (dir: string) => {
    return new Promise<void>((resolve) => {
      chdir(dir)
      resolve()
    })
  }

  static exit = (status: number = 0) => {
    return new Promise<void>(() => {
      exit(status)
    })
  }

  static run = (command: string) => {
    return new Promise<void>((resolve, reject) => {
      exec(command, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  static spawn = (command: string, args: string[] = []) => {
    const child = spawn(command, args, {
      detached: true,
      stdio: 'ignore',
    })

    child.unref()

    return new Promise<void>((resolve, reject) => {
      child.on('exit', (code, signal) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`Process exited with code ${code} and signal ${signal}`))
        }
      })

      child.on('error', (err) => {
        reject(err)
      })
    })
  }
}

export default Processes
