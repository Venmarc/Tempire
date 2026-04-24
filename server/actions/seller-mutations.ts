'use server';

import { currentUser } from '@clerk/nextjs/server';
import { ProductService } from '../services/product';
import { revalidatePath } from 'next/cache';
import { ProductInsertPayload } from '@/types/product';

export async function deleteProductAction(productId: string) {
    try {
        const user = await currentUser();
        if (!user) return { error: 'Not authenticated' };

        // 1. Fetch product to verify ownership and get file paths
        const product = await ProductService.getProductById(productId);
        if (!product) return { error: 'Product not found' };
        
        if (product.creator_id !== user.id) {
            return { error: 'Unauthorized' };
        }

        // 2. Delete from DB first
        await ProductService.deleteProduct(productId);

        // 3. Cleanup storage (Async background tasks - we don't strictly wait to speed up response)
        if (product.image_url) {
            ProductService.deleteFile('product-images', product.image_url);
        }
        if (product.file_url) {
            ProductService.deleteFile('product-files', product.file_url);
        }

        revalidatePath('/');
        revalidatePath('/seller/dashboard');

        return { success: true };
    } catch (error: any) {
        console.error('deleteProductAction error:', error);
        return { error: error.message || 'Failed to delete product' };
    }
}

export async function updateProductAction(id: string, formData: FormData) {
    try {
        const user = await currentUser();
        if (!user) return { error: 'Not authenticated' };

        const product = await ProductService.getProductById(id);
        if (!product) return { error: 'Product not found' };
        if (product.creator_id !== user.id) return { error: 'Unauthorized' };

        // Extraction
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as string;
        const tagsRaw = formData.get('tags') as string;
        const is_published = formData.get('is_published') === 'true';
        
        const coverImage = formData.get('coverImage') as File;
        const productFile = formData.get('productFile') as File;

        const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) : [];
        const priceInCents = Math.round(price * 100);

        const updatePayload: Partial<ProductInsertPayload> = {
            title,
            description: description || null,
            price: priceInCents,
            category,
            tags: tags.length > 0 ? tags : null,
            is_published,
        };

        // Handle Image Update
        if (coverImage && coverImage.size > 0) {
            const uploaded = await ProductService.uploadFile(coverImage, 'product-images', user.id);
            updatePayload.image_url = uploaded.url;
            if (product.image_url) ProductService.deleteFile('product-images', product.image_url);
        }

        // Handle File Update
        if (productFile && productFile.size > 0) {
            const uploaded = await ProductService.uploadFile(productFile, 'product-files', user.id);
            updatePayload.file_url = uploaded.url;
            updatePayload.file_size = uploaded.fileSize;
            updatePayload.file_extension = uploaded.fileExtension;
            if (product.file_url) ProductService.deleteFile('product-files', product.file_url);
        }

        const updated = await ProductService.updateProduct(id, updatePayload);

        revalidatePath('/');
        revalidatePath('/seller/dashboard');
        revalidatePath(`/products/${id}`);

        return { success: true, product: updated };
    } catch (error: any) {
        console.error('updateProductAction error:', error);
        return { error: error.message || 'Failed to update product' };
    }
}
