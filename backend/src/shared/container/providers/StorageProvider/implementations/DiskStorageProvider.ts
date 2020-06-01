import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IUploadProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IUploadProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const pathFile = path.resolve(uploadConfig.uploadFolder, file);
    try {
      await fs.promises.stat(pathFile);
    } catch {
      return;
    }
    await fs.promises.unlink(pathFile);
  }
}
export default DiskStorageProvider;
