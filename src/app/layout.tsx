import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Our Covenant Love',
    default: 'Our Covenant Love - Marriage & Family for the Glory of God',
  },
  description:
    'Christian marriage and family ministry dedicated to reflecting the image and glory of God, making His character visible to the world.',
  icons: {
    icon: '/images/ocl-logo.jpg',
    apple: '/images/ocl-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen antialiased bg-covenant-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
