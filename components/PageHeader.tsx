import React from 'react'


interface Props{
    MainTitle: string,
    secondTitle: string
}

const PageHeader = ({MainTitle='', secondTitle=''}:Props) => {
  return (
    <section className="text-center mt-12 sm:mt-24 mb-4 sm:mb-8">
        <h1
          className="text-xl sm:text-3xl"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,.2)" }}
        >
          {MainTitle}
        </h1>
        <h2 className="text-white/75 text-sm sm:text-base">{secondTitle}</h2>
      </section>
  )
}

export default PageHeader