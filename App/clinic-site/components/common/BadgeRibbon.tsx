import React from 'react'

interface RibbonProps {
  text: string
  className?: string
}

const Ribbon: React.FC<RibbonProps> = ({ text, className }) => {
  return (
    <div className={className}>
      <div className='relative inline-flex'>
        <div
          style={{
            position: 'relative',
            background: '#bc0e0f',
            color: 'white',
            padding: '5px 20px',
            fontWeight: 500,
            display: 'inline-block',
            clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)'
          }}
        >
          {text}
        </div>
        <div className='absolute -bottom-[6px] left-0 border-l-[15px] border-t-[6px] border-l-transparent border-t-[#bc0e0f]'></div>
      </div>
    </div>
  )
}

export default Ribbon
