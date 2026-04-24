'use server';

import { currentUser } from '@clerk/nextjs/server';
import { ProductUploadSchema } from '@/lib/validations/product';
import { ProductService } from '../services/product';
import { ProductInsertPayload } from '@/types/product';
import { revalidatePath } from 'next/cache';

export async function createProductAction(formData: FormData) {
    try {
        const user = await currentUser();
        if (!user) {
            return { error: 'Not authenticated' };
        }

        const role = (user.publicMetadata as any)?.role;
        if (role !== 'seller') {
            return { error: 'Not authorized. Sellers only.' };
        }

        // Extract form data
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const category = formData.get('category');
        const tags = formData.get('tags');
        const is_published = formData.get('is_published');
        const coverImage = formData.get('coverImage');
        const productFile = formData.get('productFile');

        // Validate via Zod
        const parsed = ProductUploadSchema.safeParse({
            title,
            description,
            price,
            category,
            tags,
            is_published,
            coverImage,
            productFile,
        });

        if (!parsed.success) {
            return { error: parsed.error.issues[0].message };
        }

        const data = parsed.data;

        // Convert price to cents
        const priceInCents = Math.round(data.price * 100);

        // Upload files
        const creatorId = user.id;
        
        let coverImageUrl = null;
        if (data.coverImage) {
            const result = await ProductService.uploadFile(data.coverImage, 'product-images', creatorId);
            coverImageUrl = result.url;
        }

        let productFileUrl = null;
        let fileSizeBytes: number | null = null;
        let fileExtension: string | null = null;
        if (data.productFile) {
            const result = await ProductService.uploadFile(data.productFile, 'product-files', creatorId);
            productFileUrl = result.url;
            fileSizeBytes = result.fileSize;
            fileExtension = result.fileExtension;
        }

        // Generate creator name
        const creatorName = user.username || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown Creator';

        // Prepare insert payload
        const insertPayload: ProductInsertPayload = {
            title: data.title,
            description: data.description || null,
            price: priceInCents,
            category: data.category,
            tags: data.tags.length > 0 ? data.tags : null,
            is_published: data.is_published,
            creator_id: creatorId,
            creator_name: creatorName,
            image_url: coverImageUrl,
            file_url: productFileUrl,
            file_size: fileSizeBytes,
            file_extension: fileExtension,
            average_rating: 0,
            review_count: 0,
            sales_count: 0,
        };

        const newProduct = await ProductService.createProduct(insertPayload);

        // Revalidate paths to show updated products
        revalidatePath('/');
        revalidatePath('/seller/dashboard');

        return { success: true, product: newProduct };
    } catch (error: any) {
        console.error('Error creating product:', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
}

export async function getDownloadUrlAction(productId: string) {
    try {
        const user = await currentUser();
        if (!user) return { error: 'Not authenticated' };

        const product = await ProductService.getProductById(productId);
        if (!product) return { error: 'Product not found' };

        // For Phase 2, only creator can download direct from here (Buyers need cart logic built first)
        const isCreator = user.id === product.creator_id;
        
        if (!isCreator) {
            // Future check: hasBought(user.id, productId)
            return { error: 'You have not purchased this product.' };
        }

        if (!product.file_url) {
            return { error: 'No file associated with this product' };
        }

        const signedUrl = await ProductService.getSignedUrl('product-files', product.file_url);

        return { success: true, downloadUrl: signedUrl };
    } catch (error: any) {
        console.error('getDownloadUrlAction error:', error);
        return { error: 'Failed to generate download link' };
    }
}
