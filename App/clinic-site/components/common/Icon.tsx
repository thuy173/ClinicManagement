import React from 'react'
interface IconAppProps {
  name: string
  style?: React.CSSProperties
  title?: string
  color?: string
}
const IconApp: React.FC<IconAppProps> = ({ name, style, title, color }) => {
  return (
    <div className='flex justify-end items-end gap-1'>
      <i
        className={name}
        style={{
          fontSize: '24px',
          ...style
        }}
      ></i>
      {title && <p className={`${color} font-sans text-sm`}>{title}</p>}
    </div>
  )
}

export default IconApp
