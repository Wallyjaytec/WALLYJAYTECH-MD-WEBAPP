import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'WALLYJAYTECH-MD | Advanced Bot Dashboard',
  description: 'The most advanced multi-device WhatsApp bot dashboard.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white selection:bg-[#FFD700] selection:text-black transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
