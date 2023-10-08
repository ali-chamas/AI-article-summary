import React from 'react'

const Hero = () => {
  return (
    <div className=' flex flex-col gap-5 items-center justify-center pt-10 px-10 md:mx-20 lg:mx-32 xl:mx-40 '>
          <h1 className='text-center text-5xl lg:text-6xl xl:text-6xl  font-bold '>Summarize Big Articles with <br /><span className=' text-transparent bg-clip-text bg-gradient-to-r from-orange-600  to-orange-400 font-extrabold'>AI Summarizer</span></h1>
          <small className=' text-md text-center md:text-lg text-orange-900 font-bold'>Paste the website link containing the article and AI will summarize it</small>
    </div>
  )
}

export default Hero
