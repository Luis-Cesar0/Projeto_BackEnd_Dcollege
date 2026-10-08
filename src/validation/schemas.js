const { z } = require('zod');

const positiveId = z.coerce.number().int().positive();
const userFields = {
  firstname: z.string().trim().min(1).max(100),
  surname: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
};
const password = z.string().min(8).refine((value) => Buffer.byteLength(value, 'utf8') <= 72, 'A senha deve ter no máximo 72 bytes.');

const userCreate = z.object({
  ...userFields,
  password,
});
const userUpdate = z.object(userFields).partial().refine((value) => Object.keys(value).length > 0);
const login = z.object({ email: userFields.email, password: z.string().min(1).refine((value) => Buffer.byteLength(value, 'utf8') <= 72) });
const category = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().min(1).max(255),
  use_in_menu: z.boolean(),
});
const categoryUpdate = category.partial().refine((value) => Object.keys(value).length > 0);
const categoryQuery = z.object({
  limit: z.coerce.number().int().positive().max(100).or(z.literal(-1)).optional(),
  page: z.coerce.number().int().positive().optional(),
  fields: z.string().optional(),
  use_in_menu: z.enum(['true', 'false']).optional(),
});

const image = z.object({
  id: positiveId.optional(),
  content: z.string().min(1).max(65535).optional(),
  deleted: z.boolean().optional(),
}).refine((value) => value.id || value.content);
const option = z.object({
  id: positiveId.optional(),
  title: z.string().trim().min(1).max(255),
  shape: z.enum(['square', 'circle']).optional(),
  radius: z.union([z.coerce.number().int().nonnegative(), z.string().regex(/^\d+(px)?$/)]).optional(),
  type: z.enum(['text', 'color']).optional(),
  values: z.union([z.array(z.string()), z.string()]).optional(),
});
const productFields = {
  enabled: z.boolean().optional(),
  name: z.string().trim().min(1).max(255).optional(),
  slug: z.string().trim().min(1).max(255).optional(),
  use_in_menu: z.boolean().optional(),
  stock: z.number().int().nonnegative().optional(),
  description: z.string().min(1).optional(),
  price: z.number().finite().nonnegative().optional(),
  price_with_discount: z.number().finite().nonnegative().nullable().optional(),
  category_ids: z.array(positiveId).optional(),
  images: z.array(image).optional(),
  options: z.array(option).optional(),
};
const productCreate = z.object({
  ...productFields,
  name: productFields.name.unwrap(),
  slug: productFields.slug.unwrap(),
  stock: z.number().int().nonnegative(),
  description: z.string().min(1),
  price: z.number().finite().nonnegative(),
  images: z.array(z.object({ content: z.string().min(1).max(65535) })).optional(),
});
const productUpdate = z.object(productFields).refine((value) => Object.keys(value).length > 0);
const productQuery = z.object({
  limit: z.coerce.number().int().positive().max(100).or(z.literal(-1)).optional(),
  page: z.coerce.number().int().positive().optional(),
  fields: z.string().optional(),
  match: z.string().max(200).optional(),
  category_ids: z.string().regex(/^\d+(,\d+)*$/).optional(),
  price_range: z.string().regex(/^\d+(\.\d+)?-\d+(\.\d+)?$/).optional(),
  option: z.record(z.string(), z.string()).optional(),
});

module.exports = {
  positiveId,
  idParams: z.object({ id: positiveId }),
  userCreate,
  userUpdate,
  login,
  category,
  categoryUpdate,
  categoryQuery,
  productCreate,
  productUpdate,
  productQuery,
};
