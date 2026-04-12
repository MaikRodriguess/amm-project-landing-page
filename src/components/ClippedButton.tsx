interface ClippedButtonProps {
  variant: 'orange' | 'white'
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function ClippedButton({ variant, children, onClick, className = '' }: ClippedButtonProps) {
  const baseStyles = 'clipped-button'
  const variantStyles = variant === 'orange' ? 'clipped-button-orange' : 'clipped-button-white'

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
