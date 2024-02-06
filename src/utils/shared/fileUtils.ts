import {existsSync, constants, readFileSync} from 'node:fs'
import {mkdir, writeFile, access, readdir, rm} from 'node:fs/promises'

class FileUtils {
  static async createMultipleFolders(folderName: string) {
    await mkdir(folderName, {recursive: true})
  }

  static async createFolder(folderName: string) {
    await mkdir(folderName)
  }

  static async writeFile(path: string, content: string) {
    await writeFile(path, content)
  }

  static async removeFolderAndContents(path: string) {
    await rm(path, {recursive: true})
  }

  static async folderExists(path: string) {
    return access(path, constants.F_OK | constants.R_OK)
  }

  static async fileOrfolderExistsSync(path: string) {
    return existsSync(path)
  }

  static async getFolderContents(path: string, callback: any) {
    const contents = await readdir(path, {withFileTypes: true})
    return callback ? contents.filter(callback) : contents
  }

  static async getFileContents(path: string, type: BufferEncoding = 'utf8') {
    const contents = readFileSync(path, {encoding: type})
    return contents
  }
}

export default FileUtils
