import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  subject: string;
}
class FakeMailProvider implements IMailProvider {
  private emails: IMessage[] = [];

  public async sendEmail(to: string, subject: string): Promise<void> {
    this.emails.push({ to, subject });
  }
}
export default FakeMailProvider;
