import { z } from '../modules/zod';

// Validação para MediaComponent
const MediaComponent = z.object({
  link: z.string().optional()
});

// Validação para ExampleComponent
const ExampleComponent = z.object({
  header_text: z.array(z.string()).optional(),
  header_handle: z.array(z.string()).optional(),
  body_text: z.array(z.array(z.string())).optional()
});

// Validação para ButtonComponent
const ButtonComponent = z.object({
  type: z.enum(['PHONE_NUMBER', 'URL', 'QUICK_REPLY', 'COPY_CODE', 'FLOW']),
  text: z.string().max(25),
  phone_number: z.string().max(20).optional(),
  url: z.string().max(2000).optional(),
  example: z.array(z.string()).optional(),
  flow_id: z.string().optional(),
  flow_action: z.enum(['navigate', 'data_exchange']).optional(),
  navigate_screen: z.string().optional()
});

// Validação para Components
const Components = z.object({
  type: z.enum(['BODY', 'HEADER', 'FOOTER', 'BUTTONS']),
  format: z.enum(['TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT', 'LOCATION']).optional(),
  text: z.string().optional(),
  example: ExampleComponent.optional(),
  buttons: z.array(ButtonComponent).optional(),
  image: MediaComponent.optional(),
  video: MediaComponent.optional(),
  document: MediaComponent.optional()
});

// Validação para Template
const templateSchema = z
  .object({
    name: z.string(),
    category: z.enum(['AUTHENTICATION', 'MARKETING', 'UTILITY']),
    allow_category_change: z.boolean().optional(),
    language: z.string(),
    components: z.array(Components).nonempty()
  })
  .refine(
    (data) => {
      const variableCount = (text: string) =>
        (text.match(/{{\d+}}/g) || []).length;

      return data.components.every((component) => {
        const text = component.text || '';
        const varCount = variableCount(text);
        const wordCount = text.split(' ').length;

        if (component.type === 'HEADER') return true;

        // Verifica a relação entre variáveis e palavras
        return varCount === 0 || wordCount >= 4 * varCount;
      });
    },
    {
      message: 'Cada variável deve ter pelo menos 3 palavras não variáveis.',
      path: ['components']
    }
  )
  .refine(
    (data) => {
      const variableCount = data.components.reduce((count, component) => {
        const text = component.text || '';
        return count + (text.match(/{{\d+}}/g) || []).length;
      }, 0);

      return variableCount <= 100;
    },
    {
      message: 'Não pode ter mais de 100 variáveis por mensagem.',
      path: ['components']
    }
  );

export default templateSchema;
