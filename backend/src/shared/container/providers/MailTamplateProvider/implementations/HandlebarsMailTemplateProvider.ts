import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTamplateProvider';
import IMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
export default HandlebarsMailTemplateProvider;
