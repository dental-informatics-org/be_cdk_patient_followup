import { z } from '../modules/zod';

const textComponentSchema = z.object({
  text: z.string()
});

const buttonComponentSchema = z
  .object({
    type: z.enum(['QUICK_REPLY', 'URL']),
    title: z.string(),
    payload: z.string().optional(),
    url: z.string().url().optional()
  })
  .refine(
    (data) =>
      (data.type === 'QUICK_REPLY' && data.payload) ||
      (data.type === 'URL' && data.url),
    {
      message:
        'Payload is required for QUICK_REPLY and URL is required for URL type'
    }
  );

const imageComponentSchema = z.object({
  link: z.string().url()
});

const componentSchema = z.object({
  type: z.enum(['BODY', 'HEADER', 'FOOTER', 'BUTTON']),
  text: textComponentSchema.optional(),
  button: buttonComponentSchema.optional(),
  image: imageComponentSchema.optional()
});

const templateSchema = z.object({
  name: z.string(),
  category: z.enum(['AUTHENTICATION', 'MARKETING', 'UTILITY']),
  allow_category_change: z.boolean().optional(),
  language: z.string(),
  components: z.array(componentSchema)
});

const validateTemplate = (data: unknown) => {
  return templateSchema.parse(data);
};

export default validateTemplate;
