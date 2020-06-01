import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IUploadProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IUploadProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
