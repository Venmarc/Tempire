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

export const fileSchema = z.custom<File>((val) => val instanceof File, 'Please upload a file.')
    .refine((file) => file.size <= 100 * 1024 * 1024, { message: 'File size must be less than 100MB.' })
    .refine((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext && [
            'zip', 'pdf', 'json', 'md', 'txt', 'png', 'jpg', 'jpeg', 
            'gif', 'webp', 'notion', 'csv', 'xlsx'
        ].includes(ext);
    }, { message: 'Invalid file extension.' });

export const imageSchema = z.custom<File>((val) => val instanceof File, 'Please upload an image.')
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Image size must be less than 5MB.' })
    .refine((file) => file.type.startsWith('image/'), { message: 'Must be an image.' });

export const ProductUploadSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    description: z.string().optional(),
    price: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val),
        z.number().min(0, "Price must be positive").max(10000, "Price must be realistic")
    ),
    category: z.string().min(1, "Please select a category"),
    tags: z.string().transform(str => str.split(',').map(s => s.trim()).filter(Boolean)),
    is_published: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
    // Fields for the files. Note that in a FormData they will be raw File objects.
    coverImage: imageSchema,
    productFile: fileSchema,
});

export type ProductUploadInput = z.infer<typeof ProductUploadSchema>;
