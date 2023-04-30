import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='background flex justify-center items-center flex-col bg-blue-100 h-screen'>
              <div className='flex justify-center items-center flex-col gap-1'>
              <p className='font text-6xl font-bold'><span className="text-blue-600">Note</span>Wise</p>
              <p className='font text-2xl px-4 text-center'>Your digital notebook for all your thoughts and ideas.</p>
              </div>
              
             <Link to="/login"><button className='exploreBtn font'>Get Started <span className='right-ar'>	&rarr;</span></button></Link> 
              
        </div>
  )
}

export default Main