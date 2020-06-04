import IMailTemplateProvider from '../models/IMailTamplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
export default FakeMailTemplateProvider;
