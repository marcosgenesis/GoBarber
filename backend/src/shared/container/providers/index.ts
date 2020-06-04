import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IUploadProvider from './StorageProvider/models/IStorageProvider';
import EatherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import IMailTamplateProvider from './MailTamplateProvider/models/IMailTamplateProvider';
import HandlebarsMailTemplateProvider from './MailTamplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IUploadProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTamplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EatherealMailProvider),
);
