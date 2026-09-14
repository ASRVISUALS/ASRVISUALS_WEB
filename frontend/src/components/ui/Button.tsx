import Link from 'next/link'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  className?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-md transform'
  
  const variantClasses = {
    // Primary red CTA button with glow effect
    primary: 'bg-brand-red text-white hover:bg-brand-red-hover hover:-translate-y-1 hover:shadow-red-glow active:translate-y-0 active:bg-brand-red',
    // Secondary outline button
    outline: 'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white active:scale-95',
    // Ghost button for secondary actions
    ghost: 'text-text-secondary hover:text-brand-red hover:bg-brand-red/5 active:scale-95',
  }
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`
  
  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    )
  }
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={classes}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default Button