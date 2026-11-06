import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'WALLYJAYTECH-MD | Advanced Bot Dashboard',
  description: 'The most advanced multi-device WhatsApp bot dashboard.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white selection:bg-[#FFD700] selection:text-black transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
