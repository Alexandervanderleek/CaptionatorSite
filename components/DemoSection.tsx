import React from 'react'
import RocketIcon from './rocket'

const DemoSection = () => {
  return (
    <section className="flex mt-8 sm:mt-12 justify-around items-center">
        <div className="hidden sm:flex sm:items-center bg-gray-800/50 w-[240px] h-[480px] rounded-xl relative">
          <video autoPlay loop muted src={"/vid1.mp4"} controls></video>
        </div>
        <div className="hidden sm:block">
          <RocketIcon />
        </div>
        <div className="flex bg-gray-800/50 w-[240px] h-[480px] rounded-xl">
          <video autoPlay loop muted src={"/vid2.mp4"} controls></video>
        </div>
      </section>
  )
}

export default DemoSection