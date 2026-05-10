import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { LibraryService } from '@/server/services/library';
import { ProductService } from '@/server/services/product';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return new NextResponse('Missing product ID', { status: 400 });
    }

    // 1. Verify ownership and get signed URL
    const signedUrl = await LibraryService.getSignedDownloadUrl(userId, productId);
    
    // 2. Get product metadata for the filename
    const product = await ProductService.getProductById(productId);
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // 3. Fetch the file from the signed URL
    const response = await fetch(signedUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch file from storage');
    }

    // 4. Prepare the human-readable filename
    // Sanitize title: remove non-alphanumeric (except dots/dashes) and replace spaces with underscores
    const sanitizedTitle = product.title
      .replace(/[^a-z0-9.\- ]/gi, '')
      .replace(/\s+/g, '_');
    
    const extension = product.file_extension || 'zip';
    const filename = `${sanitizedTitle}.${extension}`;

    // 5. Return the stream with forced download headers
    const headers = new Headers(response.headers);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    // Ensure we don't leak the internal Supabase URL in headers if it exists
    headers.delete('x-amz-request-id'); 
    headers.delete('x-amz-id-2');

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });

  } catch (error: any) {
    console.error('Download API Error:', error);
    const status = error.message.includes('Access denied') ? 403 : 500;
    return new NextResponse(error.message || 'Internal Server Error', { status });
  }
}
