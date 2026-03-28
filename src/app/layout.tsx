import Aside from '@/components/aside'
import { GlobalProvider } from '@/context/GlobalContext'
import '../styles/tailwind.css'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import GlobalClient from './GlobalClient'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s - Malak Store',
    default: 'Malak Store',
  },
  description:
    'Malak Store is a modern and elegant template for Next.js, Tailwind CSS, and TypeScript. It is designed to be simple and easy to use, with a focus on performance and accessibility.',
  keywords: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Malak Store', 'Headless UI', 'Fashion', 'E-commerce'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <GlobalProvider>
          <Aside.Provider>
            {children}

            {/* Client component: Toaster, ... */}
            <GlobalClient />
          </Aside.Provider>
        </GlobalProvider>
      </body>
    </html>
  )
}
