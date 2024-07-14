import { Template } from '../model/template';
import validateTemplate from '../schema/valideTemplate';

const { META_GRAPH_URL, META_BEARERTOKEN, META_ACCOUNT_ID } = process.env;

export const createTemplateService = async (template: Template) => {
  try {
    const validation = validateTemplate(template);
    console.log(validation);
    const { body } = await fetch(`${META_GRAPH_URL}${META_ACCOUNT_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${META_BEARERTOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(template)
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Template criado com sucesso',
        body,
        validation
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar template' })
    };
  }
};
