import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          border: '1px solid #333',
        }}
      >
        <div
          style={{
            background: '#000',
            width: '24px',
            height: '16px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '2px',
          }}
        >
          <span style={{ color: '#00ff00', fontSize: '8px', fontFamily: 'monospace' }}>
            $
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
