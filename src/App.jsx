import React from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Summarizer from './components/Summarizer'
const App = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col gap-5  overflow-y-auto'>
      <Navbar/>
      <Hero/>
      <Summarizer/>
    </div>
  )
}

export default App
