import { Link } from '@/components/Link'
import React from 'react'

export interface LogoProps extends React.ComponentPropsWithoutRef<'svg'> {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'shrink-0', ...props }) => {
  return (
    <Link
      href="/"
      className={`flex items-center text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 ${className}`}
    >
      Malak Store
    </Link>
  )
}

export default Logo
