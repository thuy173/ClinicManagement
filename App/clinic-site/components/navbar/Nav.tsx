import React from 'react'
import { Card } from '@nextui-org/react'
import headerConfig from '@components/header/header-config'

const MobileNav: React.FC = () => {
  return (
    <Card
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: '20px 20px 0 0',
        backgroundColor: '#f5f5ff',
        zIndex: 1000
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 0'
        }}
      >
        {headerConfig.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <i
              className={item.icon}
              style={{
                fontSize: '24px',
                // color: item.active ? '#7b61ff' : '#ccc'
              }}
            />
            <div
              style={{
                fontSize: '12px',
                // color: item.active ? '#7b61ff' : '#666',
                marginTop: '5px'
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default MobileNav
