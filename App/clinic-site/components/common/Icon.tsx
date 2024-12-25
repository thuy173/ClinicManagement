import Image, { StaticImageData } from '@node_modules/next/image'
import React from 'react'
interface IconAppProps {
  name?: string
  src?: string | StaticImageData
  style?: React.CSSProperties
  title?: string
  color?: string
  width?: number
  height?: number
}
const IconApp: React.FC<IconAppProps> = ({
  name,
  src,
  style,
  title,
  color,
  width,
  height 
}) => {
  return (
    <div className='flex items-end justify-end gap-1'>
      {src ? (
        <div
          className='relative'
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            src={src}
            alt={title || ""}
            fill
            className='object-contain'
            style={style}
          />
        </div>
      ) : (
        <i
          className={name}
          style={{
            fontSize: '24px',
            ...style
          }}
        ></i>
      )}
      {title && <p className={`${color} font-sans text-sm`}>{title}</p>}
    </div>
  )
}

export default IconApp
