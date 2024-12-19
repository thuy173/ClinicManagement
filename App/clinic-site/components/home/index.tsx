import IntroCard from './IntroCard'
import VideoBanner from './VideoBanner'

const HomeContent = () => {
  return (
    <section>
        <VideoBanner />
        <div className='relative z-10 mt-[-560px] md:mt-[-620px] lg:mt-[-210px]'>
          <IntroCard />
        </div>
    </section>
  )
}

export default HomeContent
