import type { Metadata } from 'next';
import { Provider } from 'jotai';
import NavHeader from './components/NavHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Earthquake Tracker',
  description:
    'See earthquake events around the world from this week and today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavHeader />
          {children}
        </Provider>
      </body>
    </html>
  );
}
