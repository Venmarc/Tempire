import { z } from 'zod';

const ALL_ALLOWED_FILES = [
    'application/zip',
    'application/x-zip-compressed',
    'application/pdf',
    'application/json',
    'text/markdown',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    // notion might be exported as zip or md, there's no official .notion mime, but we'll check extension for files
];

export const fileSchema = z.custom<File | undefined | null>((val) => {
    if (!val) return true;
    if (val instanceof File && val.size === 0) return true;
    return val instanceof File;
}, 'Please upload a file.')
    .refine((file) => !file || file.size <= 100 * 1024 * 1024, { message: 'File size must be less than 100MB.' })
    .refine((file) => {
        if (!file || file.size === 0) return true;
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext && [
            'zip', 'pdf', 'json', 'md', 'txt', 'png', 'jpg', 'jpeg', 
            'gif', 'webp', 'notion', 'csv', 'xlsx'
        ].includes(ext);
    }, { message: 'Invalid file extension.' });

export const imageSchema = z.custom<File | undefined | null>((val) => {
    if (!val) return true;
    if (val instanceof File && val.size === 0) return true;
    return val instanceof File;
}, 'Please upload an image.')
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB.' })
    .refine((file) => {
        if (!file || file.size === 0) return true;
        return file.type.startsWith('image/');
    }, { message: 'Must be an image.' });

export const createDraftSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    description: z.string().optional(),
    price: z.preprocess(
        (val) => {
            if (!val || val === '') return 0;
            return typeof val === 'string' ? parseFloat(val) : val;
        },
        z.number().min(0, "Price must be positive").max(10000, "Price must be realistic").optional()
    ),
    category: z.string().optional(),
    tags: z.string().transform(str => str ? str.split(',').map(s => s.trim()).filter(Boolean) : []).optional(),
    coverImage: imageSchema.optional(),
    productFile: fileSchema.optional(),
});

export const publishProductSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    description: z.string().min(10, "Please provide a meaningful description"),
    price: z.preprocess(
        (val) => {
            if (!val || val === '') return 0;
            return typeof val === 'string' ? parseFloat(val) : val;
        },
        z.number().min(0.50, "Price must be at least $0.50 for published products").max(10000, "Price must be realistic")
    ),
    category: z.string().min(1, "Category is required for publishing"),
    tags: z.string().transform(str => str ? str.split(',').map(s => s.trim()).filter(Boolean) : []).optional(),
    coverImage: imageSchema.superRefine((val, ctx) => {
        if (!(val instanceof File) || val.size === 0) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cover image is required for published products." });
        }
    }),
    productFile: fileSchema.superRefine((val, ctx) => {
        if (!(val instanceof File) || val.size === 0) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Product file is required for published products." });
        }
    }),
});

export type CreateDraftInput = z.infer<typeof createDraftSchema>;
export type PublishProductInput = z.infer<typeof publishProductSchema>;
