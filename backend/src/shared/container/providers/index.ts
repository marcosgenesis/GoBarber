import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import IUploadProvider from './models/IStorageProvider';

container.registerSingleton<IUploadProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
