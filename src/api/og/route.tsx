// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Add proper caching headers for better performance
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') ?? 'Professional Tax & Accounting Solutions';
    const category = searchParams.get('category') ?? 'Tax Advisory';
    const author = searchParams.get('author') ?? 'Shivansh Infosys';
    const date = searchParams.get('date') ?? new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Enhanced title truncation with word boundary respect
    const truncatedTitle = title.length > 60 ? 
      title.substring(0, 60).split(' ').slice(0, -1).join(' ') + '...' : 
      title;

    // Validate and sanitize inputs
    const cleanCategory = category.replace(/[<>]/g, '').trim();
    const cleanAuthor = author.replace(/[<>]/g, '').trim();
    const cleanDate = date.replace(/[<>]/g, '').trim();

    const response = new ImageResponse(
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
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle background pattern for visual interest */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(197, 2, 2, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(197, 2, 2, 0.1) 0%, transparent 50%)',
              opacity: 0.3,
            }}
          />

          {/* Header with enhanced branding */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#C50202',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 28,
                fontWeight: 'bold',
                boxShadow: '0 8px 16px rgba(197, 2, 2, 0.3)',
                border: '3px solid white',
              }}
            >
              💼
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#1f2937',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Shivansh Infosys
            </div>
          </div>

          {/* Enhanced category badge */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 60,
              backgroundColor: 'white',
              color: '#C50202',
              padding: '12px 20px',
              borderRadius: '25px',
              fontSize: 18,
              fontWeight: '700',
              border: '2px solid #C50202',
              boxShadow: '0 4px 12px rgba(197, 2, 2, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              zIndex: 10,
            }}
          >
            {cleanCategory}
          </div>

          {/* Main content area with enhanced styling */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: 1000,
              padding: '0 80px',
              zIndex: 10,
            }}
          >
            {/* Enhanced icon with multiple layers */}
            <div
              style={{
                position: 'relative',
                marginBottom: 50,
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 140,
                  backgroundColor: '#C50202',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 25px 35px -5px rgba(197, 2, 2, 0.4), 0 0 0 8px rgba(255, 255, 255, 0.8)',
                  border: '4px solid white',
                }}
              >
                <div
                  style={{
                    fontSize: 70,
                    color: 'white',
                  }}
                >
                  📊
                </div>
              </div>
              {/* Subtle glow effect */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  right: '-10px',
                  bottom: '-10px',
                  background: 'radial-gradient(circle, rgba(197, 2, 2, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: -1,
                }}
              />
            </div>

            {/* Enhanced title with better typography */}
            <h1
              style={{
                fontSize: 52,
                fontWeight: '800',
                color: '#1f2937',
                margin: '0 0 40px 0',
                lineHeight: 1.1,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '-0.5px',
              }}
            >
              {truncatedTitle}
            </h1>

            {/* Enhanced meta information with better spacing */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                fontSize: 22,
                color: '#4b5563',
                marginBottom: 30,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '16px 32px',
                borderRadius: '50px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>👨‍💼</span>
                <span style={{ fontWeight: '600' }}>{cleanAuthor}</span>
              </div>
              <div 
                style={{ 
                  width: '2px', 
                  height: '24px', 
                  backgroundColor: '#d1d5db' 
                }} 
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>📅</span>
                <span style={{ fontWeight: '600' }}>{cleanDate}</span>
              </div>
            </div>

            {/* Professional tagline */}
            <div
              style={{
                fontSize: 18,
                color: '#6b7280',
                fontStyle: 'italic',
                textAlign: 'center',
                maxWidth: 600,
              }}
            >
              Expert Tax & Accounting Solutions • GST Compliance • Business Advisory
            </div>
          </div>

          {/* Enhanced bottom accent with pattern */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              background: 'linear-gradient(90deg, #C50202 0%, #E53E3E 50%, #C50202 100%)',
            }}
          />
          
          {/* Corner decorative elements */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 60,
              fontSize: 14,
              color: '#9ca3af',
              fontWeight: '500',
            }}
          >
            shivansh-infosys.com
          </div>

          {/* Watermark for brand protection */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: 60,
              fontSize: 12,
              color: '#d1d5db',
              opacity: 0.7,
            }}
          >
            © Shivansh Infosys
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Enhanced emoji handling
        emoji: 'twemoji',
      }
    );

    // Add comprehensive caching headers
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, max-age=31536000, immutable');
    
    // Add content type and security headers
    response.headers.set('Content-Type', 'image/png');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Robots-Tag', 'index, follow');
    
    return response;

  } catch (e: unknown) {
  if (e instanceof Error) {
    console.error('OG Image generation error:', e.message);
  } else {
    console.error('OG Image error (unexpected):', e);
  }
    // Return a fallback error image instead of text response
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
            backgroundColor: '#f3f4f6',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: 24,
            }}
          >
            Shivansh Infosys
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#6b7280',
            }}
          >
            Professional Tax & Accounting Solutions
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}