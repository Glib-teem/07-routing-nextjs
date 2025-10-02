import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Your personal notes manager',
};

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
  sidebar?: ReactNode;
}

export default function RootLayout({
  children,
  modal,
  sidebar,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {sidebar}
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
