// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') ?? 'Blog Post';
    const category = searchParams.get('category') ?? 'Article';
    const author = searchParams.get('author') ?? 'Author';
    const date = searchParams.get('date') ?? new Date().toLocaleDateString();

    // Truncate title if too long
    const truncatedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEF6FF',
            backgroundImage: 'linear-gradient(135deg, #EEF6FF 0%, #FCF2F2 100%)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Header with logo area */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#C50202',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              }}
            >
              📝
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1f2937',
              }}
            >
              Your Blog Name
            </div>
          </div>

          {/* Category badge */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 60,
              backgroundColor: '#FCF2F2',
              color: '#C50202',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: 16,
              fontWeight: '600',
              border: '2px solid #C50202',
            }}
          >
            {category}
          </div>

          {/* Main content area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: 1000,
              padding: '0 60px',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#C50202',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
                boxShadow: '0 20px 25px -5px rgba(197, 2, 2, 0.3)',
              }}
            >
              <div
                style={{
                  fontSize: 60,
                  color: 'white',
                }}
              >
                📄
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 30px 0',
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              {truncatedTitle}
            </h1>

            {/* Meta information */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                fontSize: 20,
                color: '#6b7280',
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>👤</span>
                <span>{author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>📅</span>
                <span>{date}</span>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              backgroundColor: '#C50202',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}