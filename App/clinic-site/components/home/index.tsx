import Banner from './Banner'
import IntroCard from './IntroCard'
import Swiper from './Swiper'

const HomeContent = () => {
  return (
    <section>
        <Banner />
        <div className='relative z-10 mt-[-560px] md:mt-[-620px] lg:mt-[-220px]'>
          <IntroCard />
        </div>
        <Swiper/>
    </section>
  )
}

export default HomeContent
