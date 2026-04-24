import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Digital Product';
    const price = searchParams.get('price') || '—';
    const creator = searchParams.get('creator') || 'Creator';
    const category = searchParams.get('category') || 'Digital Goods';

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#09090b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '60px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 28,
                            fontWeight: 800,
                            color: '#09090b',
                        }}
                    >
                        T
                    </div>
                    <span style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, letterSpacing: '-1px' }}>
                        Tempire
                    </span>
                    <span
                        style={{
                            marginLeft: 'auto',
                            background: '#18181b',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#a1a1aa',
                            fontSize: 14,
                            padding: '6px 14px',
                            borderRadius: 9999,
                        }}
                    >
                        {category}
                    </span>
                </div>

                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ color: '#10b981', fontSize: 16, margin: 0 }}>by {creator}</p>
                    <h1
                        style={{
                            color: '#ffffff',
                            fontSize: title.length > 40 ? 52 : 64,
                            fontWeight: 800,
                            letterSpacing: '-2px',
                            lineHeight: 1.1,
                            margin: 0,
                        }}
                    >
                        {title}
                    </h1>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#a1a1aa', fontSize: 18 }}>tempire.marketplace</span>
                    <span
                        style={{
                            background: '#ffffff',
                            color: '#09090b',
                            fontWeight: 700,
                            fontSize: 28,
                            padding: '10px 28px',
                            borderRadius: 9999,
                        }}
                    >
                        {price}
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
