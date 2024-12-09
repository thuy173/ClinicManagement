import About from "./about/page";

const Home = () => {
  return (
    <section className='flex-center w-full flex-col mt-20'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> AI Powered Prompts</span>
      </h1>
      <p className="text-center">Promptopia is an open-source AI prompting tool for modern world</p>
      <About/>
      <About/>
      <About/>
      <About/>
      <About/>
      <About/>
      <About/>
      <About/>
      <About/>
    </section>
  )
}

export default Home;
