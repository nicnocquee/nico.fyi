import siteMetadata from '@/data/siteMetadata'
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const interExtrabold = fetch(
    new URL('../../../public/Inter-ExtraBold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  try {
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Default title'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${siteMetadata.siteUrl}/static/images/social-card-bg.jpg)`,
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontFamily: 'Inter',
            padding: '40px 80px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: 'white',
              marginBottom: 24,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              width="80"
              height="80"
              src={`https://avatars.githubusercontent.com/u/311343?v=4`}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  color: 'white',
                  marginLeft: 20,
                  marginBottom: 10,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {siteMetadata.author}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  color: 'white',
                  marginLeft: 20,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {siteMetadata.siteUrl}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await interExtrabold,
            style: 'normal',
            weight: 800,
          },
        ],
      }
    )
  } catch (e: unknown) {
    console.error(e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
