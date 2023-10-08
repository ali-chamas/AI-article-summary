import React from 'react'
import logo from '../assets/logo.svg'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-5 md:px-10 xl:px-20 '>

      <h1 className=' '>
        <img src={logo} className='h-[45px] md:h-[50px] xl:h-[60px]'/>
      </h1>

      <a href="https://github.com/watwatos/AI-article-summary" className='bg-black text-white p-2 rounded-full hover:opacity-80 px-5' >github</a>


      
    </div>
  )
}

export default Navbar
