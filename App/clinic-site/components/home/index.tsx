import Banner from './Banner'
import IntroCard from './IntroCard'

const HomeContent = () => {
  return (
    <section>
        <Banner />
        <div className='relative z-10 mt-[-560px] md:mt-[-620px] lg:mt-[-220px]'>
          <IntroCard />
        </div>
    </section>
  )
}

export default HomeContent
