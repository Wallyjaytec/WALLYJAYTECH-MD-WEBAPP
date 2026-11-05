import './globals.css'

export const metadata = {
  title: 'WALLYJAYTECH-MD | Advanced Bot Dashboard',
  description: 'The most advanced multi-device WhatsApp bot dashboard.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white selection:bg-[#FFD700] selection:text-black">
        {children}
      </body>
    </html>
  )
}
