import { Input } from '@node_modules/@nextui-org/input/dist'
import React, { ReactNode } from 'react'

interface InputAppProps {
  type: string
  placeholder?: string
  endContent?: ReactNode
}
const InputApp: React.FC<InputAppProps> = ({
  type,
  placeholder,
  endContent
}) => {
  return (
    <>
      <Input
        endContent={endContent}
        labelPlacement='outside'
        placeholder={placeholder}
        type={type}
        classNames={{
          innerWrapper: 'bg-transparent',
          input: ['bg-transparent', 'text-black/90 dark:text-white/90'],
          inputWrapper: [
            'border-2',
            'my-2',
            'bg-transparent',
            'rounded-full',
            'overflow-hidden'
          ]
        }}
      />
    </>
  )
}

export default InputApp
