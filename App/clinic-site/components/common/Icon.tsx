import React from 'react'
interface IconAppProps {
  name: string
  style?: React.CSSProperties
  title?: string
}
const IconApp: React.FC<IconAppProps> = ({ name, style, title }) => {
  return (
    <div className='flex justify-end items-end gap-1'>
      <i
        className={name}
        style={{
          fontSize: '24px',
          ...style
        }}
      ></i>
      {title && <p className='font-sans text-sm text-blue-500'>{title}</p>}
    </div>
  )
}

export default IconApp
