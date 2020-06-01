export default interface IMailProvider {
  sendEmail(to: string, subject: string): Promise<void>;
}
