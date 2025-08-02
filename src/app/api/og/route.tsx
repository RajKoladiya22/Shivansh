// import { ImageResponse } from 'next/og';
// import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   // Quick sanity-check: return plain text to ensure route is hit
//   if (searchParams.get('debug') === 'true') {
//     return new NextResponse('OG route is working', {
//       status: 200,
//       headers: { 'Content-Type': 'text/plain' }
//     });
//   }

//   try {
//     const title = searchParams.get('title') ?? 'Professional Tax & Accounting Solutions';
//     const category = searchParams.get('category') ?? 'Tax Advisory';
//     const author = searchParams.get('author') ?? 'Shivansh Infosys';
//     const date = searchParams.get('date') ?? new Date().toLocaleDateString('en-IN', {
//       year: 'numeric', month: 'long', day: 'numeric'
//     });

//     // Truncate title at a word boundary
//     const truncatedTitle = title.length > 60
//       ? title.substring(0, 60).split(' ').slice(0, -1).join(' ') + '...'
//       : title;

//     // Sanitize inputs
//     const cleanCategory = category.replace(/[<>]/g, '').trim();
//     const cleanAuthor   = author.replace(/[<>]/g, '').trim();
//     const cleanDate     = date.replace(/[<>]/g, '').trim();

//     const image = new ImageResponse(
//       (
//         <div style={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: '#EEF6FF',
//           fontFamily: 'system-ui, sans-serif',
//         }}>
//           <h1 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16 }}>
//             {truncatedTitle}
//           </h1>
//           <p style={{ fontSize: 24, color: '#4b5563' }}>
//             {cleanCategory} • {cleanAuthor} • {cleanDate}
//           </p>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//         emoji: 'twemoji',
//       }
//     );

//     // Set headers
//     image.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
//     image.headers.set('Content-Type', 'image/png');
//     image.headers.set('X-Content-Type-Options', 'nosniff');

//     return image;

//   } catch (error) {
//     console.error('OG generation error:', error);

//     // In development, return error text so you can see what went wrong
//     return new NextResponse(
//       `Error generating OG image: ${error instanceof Error ? error.message : String(error)}`,
//       { status: 500, headers: { 'Content-Type': 'text/plain' } }
//     );
//   }
// }



import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Debug route
  if (searchParams.get('debug') === 'true') {
    return new NextResponse('OG route is working', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  try {
    const title = searchParams.get('title') ?? 'Professional Tax & Accounting Solutions';
    const category = searchParams.get('category') ?? 'Tax Advisory';
    const author = searchParams.get('author') ?? 'Shivansh Infosys';
    const date = searchParams.get('date') ?? new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const views = searchParams.get('views') ?? '1,250';
    const readingTime = searchParams.get('readingTime') ?? '5';

    // Smart title truncation at word boundary
    const truncatedTitle = title.length > 65
      ? title.substring(0, 65).split(' ').slice(0, -1).join(' ') + '...'
      : title;

    // Sanitize inputs
    const cleanCategory = category.replace(/[<>]/g, '').trim();
    const cleanAuthor = author.replace(/[<>]/g, '').trim();
    const cleanDate = date.replace(/[<>]/g, '').trim();

    // Category colors and icons mapping
    const getCategoryStyle = (cat: string) => {
      const catLower = cat.toLowerCase();
      if (catLower.includes('gst')) return { color: '#059669', bg: '#ECFDF5', icon: '🧾' };
      if (catLower.includes('tax')) return { color: '#DC2626', bg: '#FEF2F2', icon: '📊' };
      if (catLower.includes('audit')) return { color: '#7C3AED', bg: '#F5F3FF', icon: '🔍' };
      if (catLower.includes('compliance')) return { color: '#EA580C', bg: '#FFF7ED', icon: '✅' };
      if (catLower.includes('finance')) return { color: '#0284C7', bg: '#F0F9FF', icon: '💰' };
      return { color: '#C50202', bg: '#FCF2F2', icon: '📈' };
    };

    const categoryStyle = getCategoryStyle(cleanCategory);

    const image = new ImageResponse(
      (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #EEF6FF 0%, #F8FAFC 50%, #FCF2F2 100%)',
            opacity: 0.8,
          }} />
          
          {/* Geometric Background Elements */}
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #C50202, #EF4444)',
            opacity: 0.1,
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '20px',
            background: 'linear-gradient(45deg, #059669, #10B981)',
            opacity: 0.08,
            transform: 'rotate(15deg)',
          }} />

          {/* Main Content Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '60px',
            position: 'relative',
            zIndex: 10,
          }}>
            
            {/* Header Section */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '40px',
            }}>
              {/* Brand/Logo Section */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #C50202, #EF4444)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  boxShadow: '0 8px 25px rgba(197, 2, 2, 0.3)',
                }}>
                  📊
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1F2937',
                    lineHeight: '1.2',
                  }}>
                    Shivansh Infosys
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#6B7280',
                    fontWeight: '500',
                  }}>
                    Tax & Accounting Experts
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: categoryStyle.bg,
                color: categoryStyle.color,
                padding: '12px 20px',
                borderRadius: '25px',
                border: `2px solid ${categoryStyle.color}`,
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}>
                <span style={{ fontSize: '20px' }}>{categoryStyle.icon}</span>
                {cleanCategory}
              </div>
            </div>

            {/* Main Title Section */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: '40px',
            }}>
              <h1 style={{
                fontSize: '52px',
                fontWeight: '800',
                color: '#111827',
                lineHeight: '1.1',
                margin: '0 0 20px 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #111827, #374151)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {truncatedTitle}
              </h1>
              
              {/* Accent Line */}
              <div style={{
                width: '120px',
                height: '6px',
                background: `linear-gradient(90deg, ${categoryStyle.color}, #EF4444)`,
                borderRadius: '3px',
                marginBottom: '24px',
              }} />
            </div>

            {/* Footer Section */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              padding: '24px 32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              {/* Author Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                }}>
                  👤
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1F2937',
                  }}>
                    {cleanAuthor}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280',
                  }}>
                    Expert Author
                  </div>
                </div>
              </div>

              {/* Meta Information */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
              }}>
                {/* Date */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6B7280',
                  fontSize: '16px',
                }}>
                  <span style={{ fontSize: '18px' }}>📅</span>
                  {cleanDate}
                </div>

                {/* Reading Time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6B7280',
                  fontSize: '16px',
                }}>
                  <span style={{ fontSize: '18px' }}>⏱️</span>
                  {readingTime} min read
                </div>

                {/* Views */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6B7280',
                  fontSize: '16px',
                }}>
                  <span style={{ fontSize: '18px' }}>👁️</span>
                  {views} views
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent Bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: `linear-gradient(90deg, ${categoryStyle.color}, #EF4444, #F59E0B, #10B981)`,
          }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'twemoji',
      }
    );

    // Optimal caching headers
    image.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    image.headers.set('Content-Type', 'image/png');
    image.headers.set('X-Content-Type-Options', 'nosniff');
    image.headers.set('Access-Control-Allow-Origin', '*');

    return image;

  } catch (error) {
    console.error('OG generation error:', error);
    
    return new NextResponse(
      `Error generating OG image: ${error instanceof Error ? error.message : String(error)}`,
      { 
        status: 500, 
        headers: { 'Content-Type': 'text/plain' } 
      }
    );
  }
}