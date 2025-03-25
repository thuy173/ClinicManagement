import { Button } from '@node_modules/@nextui-org/button/dist'
import React from 'react'

interface ButtonAppProps {
  title?: string
  onClick?: () => void
  icon?: string
  radius?: 'full' | 'none' | 'sm' | 'md' | 'lg'
  size?:  'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}
const ButtonApp: React.FC<ButtonAppProps> = ({ title, onClick, icon, radius = 'full', size, className, style }) => {
  return (
    <Button
      className={`${className}`}
      radius={radius}
      size={size}
      onClick={onClick}
    >
      <i className={`${icon}`} 
      style={{
            fontSize: '24px',
            ...style
          }}></i>
      {title}
    </Button>
  )
}

export default ButtonApp
