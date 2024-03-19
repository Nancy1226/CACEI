import React from 'react'
import Cards from '../molecules/Cards'
import { cacei } from '../../mocks/data.json'
import ejemplo from '../../mocks/ejemplo.json'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAtributosEgreso } from '../../API/Route'
function CardSection() {
  const [Data, setData] = useState([])

  useEffect(() => {
    const getData = async() => {
      try{
        const response = await getAtributosEgreso()
        setData(response.data)
      }catch(e){
        console.log(e)
      }
    }

    getData();
  }, [])
  

  return (
    <>
    <section className='flex justify-center py-10'>
      <div className='flex flex-col gap-5'>
        <h1>Bienvenido {localStorage.getItem("docente")}</h1>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 '>
          <Cards caceis={Data} />
        </div>
      </div>
    </section>
    </>
  )
}

export default CardSection