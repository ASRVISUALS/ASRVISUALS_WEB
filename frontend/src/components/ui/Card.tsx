import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

const Card = ({ children, className = '', onClick, hoverable = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : {}}
      className={`bg-bg-secondary border border-border-divider rounded-lg p-6 
             transition-all duration-300 ${hoverable ? 'cursor-pointer' : ''}
             ${hoverable ? 'hover:border-brand-red/30 hover:shadow-card-lift' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Card