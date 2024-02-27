import '@/app/ui/global.css';
import { kanit, anton } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${kanit.className} ${anton.className}antialiased`}>{children}</body>

    </html>
  );
}
