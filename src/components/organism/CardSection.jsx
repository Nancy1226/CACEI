import React from 'react'
import Cards from '../molecules/Cards'
import { cacei } from '../../mocks/data.json'
import ejemplo from '../../mocks/ejemplo.json'
import { Link } from 'react-router-dom'

function CardSection() {
  return (
    <>
    <section className='flex justify-center py-10'>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 '>
        <Cards caceis={ejemplo} />
      </div>
    </section>
    </>
  )
}

export default CardSection