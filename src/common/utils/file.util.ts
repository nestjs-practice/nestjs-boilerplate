export class FileUtil {
  static getExtension(fileName: string) {
    const fileNameSplit = fileName.split('.')
    return fileNameSplit[fileNameSplit.length - 1]
  }
}
