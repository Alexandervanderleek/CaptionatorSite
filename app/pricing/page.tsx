import React from 'react'
import PageHeader from '../components/PageHeader'

const Pricing = () => {
  return (
    <div>
        <PageHeader MainTitle='Check out the pricing' secondTitle='very easy to use'/>
    
        <div className='bg-white text-slate-700 text-center rounded-lg max-w-xs mx-auto p-4'>
            <h3 className='font-bold text-3xl'>Free</h3>
            <h4 className='mt-3'>Free forever</h4>
        </div>
    </div>
  )
}

export default Pricing