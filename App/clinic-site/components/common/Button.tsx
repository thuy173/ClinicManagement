import { Button } from '@node_modules/@nextui-org/button/dist'
import React from 'react'

interface ButtonAppProps {
  title?: string
  onClick?: () => void
  icon?: string
  className?: string
}
const ButtonApp: React.FC<ButtonAppProps> = ({ title, onClick, icon, className }) => {
  return (
    <Button
      className={`${className}`}
      radius='full'
      onClick={onClick}
    >
      <i className={`${icon}`} style={{fontSize:"24px"}}></i>
      {title}
    </Button>
  )
}

export default ButtonApp
