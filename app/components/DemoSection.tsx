import React from 'react'
import RocketIcon from './rocket'

const DemoSection = () => {
  return (
    <section className="flex mt-12 justify-around items-center">
        <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
        <div className="flex">
          <RocketIcon />
        </div>
        <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
      </section>
  )
}

export default DemoSection