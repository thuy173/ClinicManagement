import IconApp from '@components/common/Icon'
import { Card } from '@node_modules/@nextui-org/card/dist'
import React from 'react'
import FeatureImg from '../../public/assets/icons/tinh-nang.webp'
import DoctorImg from '../../public/assets/icons/bac-si.webp'
import CareImg from '../../public/assets/icons/cham-soc.webp'
import GoodCheckImg from '../../public/assets/icons/kham-tot.webp'
import AppointmentImg from '../../public/assets/icons/lich-kham.webp'
import ScheduleTestImg from '../../public/assets/icons/lich-xet-nghiem.webp'
import PayImg from '../../public/assets/icons/thanh-toan.webp'
import InjectionImg from '../../public/assets/icons/tiem.webp'

const fakeData = [
  {
    title: 'Gọi video với bác sĩ',
    src: FeatureImg
  },
  {
    title: 'Đặt khám theo bác sĩ',
    src: DoctorImg
  },
  {
    title: 'Y tế tại nhà',
    src: CareImg
  },
  {
    title: 'Gói khám sức khỏe',
    src: GoodCheckImg
  },
  {
    title: 'Đặt khám tại cơ sở',
    src: AppointmentImg
  },
  {
    title: 'Đặt lịch xét nghiệm',
    src: ScheduleTestImg
  },
  {
    title: 'Đặt lịch tiêm chủng',
    src: InjectionImg
  },
  {
    title: 'Thanh toán viện phí',
    src: PayImg
  }
]

export default function IntroCard() {
  return (
    <section>
      <div className='hidden lg:block'>
        <div className='grid grid-cols-7 gap-5 px-10'>
          {fakeData.map((item, index) => (
            <Card
              key={index}
              className={`border-none hover:border hover:border-blue-500 ${index === 7 ? 'lg:hidden' : ''}`}
            >
              <div className='flex flex-col items-center gap-2 py-3 lg:py-8'>
                <div>
                  <IconApp src={item.src} width={48} height={48} />
                </div>
                <div className='text-center font-sans text-sm text-zinc-700'>
                  {item.title}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className='block lg:hidden px-5'>
        <Card className={`border-none hover:border hover:border-blue-500`}>
          <div className='grid grid-cols-3 sm:grid-cols-4'>
            {fakeData.map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center gap-2 py-3 lg:py-8'
              >
                <div>
                  <IconApp src={item.src} width={48} height={48} />
                </div>
                <div className='text-center font-sans text-sm text-zinc-700'>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
