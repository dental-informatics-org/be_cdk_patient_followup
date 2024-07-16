import { Template } from '../model/template';
import templateSchema from '../schema/valideTemplate';

const { META_GRAPH_URL, META_BEARERTOKEN, META_ACCOUNT_ID } = process.env;

export const createTemplateService = async (template: Template) => {
  try {
    const url = `${META_GRAPH_URL}${META_ACCOUNT_ID}/message_templates`;
    templateSchema.parse(template);
    console.log(url);
    const body = await fetch(url, {
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
        body
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error
    };
  }
};
