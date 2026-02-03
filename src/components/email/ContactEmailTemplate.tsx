import * as React from 'react'

interface ContactEmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactEmailTemplate({
  name,
  email,
  subject,
  message,
}: ContactEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#f5f5f7',
        color: '#1d1d1f',
        padding: '48px 20px',
        lineHeight: '1.6',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            background: 'linear-gradient(135deg, #00f5d4 0%, #7b61ff 100%)',
            padding: '40px 32px',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '600' }}>
            ✉️ New Message
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
            From your portfolio contact form
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 32px' }}>
          {/* Sender Info Card */}
          <div
            style={{
              backgroundColor: '#f9f9fb',
              borderLeft: '4px solid #00f5d4',
              padding: '20px',
              borderRadius: '6px',
              marginBottom: '32px',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <p style={{ margin: '0 0 4px 0', color: '#8a8a9e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                From
              </p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1d1d1f' }}>
                {name}
              </p>
            </div>
            <a
              href={`mailto:${email}`}
              style={{
                color: '#00f5d4',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {email}
            </a>
          </div>

          {/* Subject */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ margin: '0 0 8px 0', color: '#8a8a9e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
              Subject
            </p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1d1d1f' }}>
              {subject}
            </p>
          </div>

          {/* Message */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ margin: '0 0 12px 0', color: '#8a8a9e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
              Message
            </p>
            <div
              style={{
                backgroundColor: '#f9f9fb',
                borderRadius: '8px',
                padding: '24px',
                border: '1px solid #e5e5e7',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#1d1d1f',
              }}
            >
              {message}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <a
              href={`mailto:${email}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#00f5d4',
                color: '#000000',
                padding: '12px 32px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'opacity 0.2s ease',
              }}
            >
              Reply to {name.split(' ')[0]}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f9f9fb',
            borderTop: '1px solid #e5e5e7',
            padding: '24px 32px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#8a8a9e', fontSize: '13px' }}>
            This message was sent from your portfolio contact form
          </p>
          <p style={{ margin: 0, color: '#d0d0d4', fontSize: '12px' }}>
            © 2026 Assaad Shreim. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactEmailTemplate
