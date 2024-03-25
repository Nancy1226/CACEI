import React from 'react'
import Cards from '../molecules/Cards'
import { useEffect, useState } from 'react'
import { getAtributosEgreso } from '../../API/Route'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
function CardSection() {
  const [Data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async() => {
      try{
        const response = await getAtributosEgreso()    
        setData(response.data)
      }catch(e){
        Swal.fire({
          icon: "warning",
          title: "Porfavor inicie sesión nuevamente para continuar.",
          showConfirmButton: true
        }).then(() => {
          navigate("/");
        });
        console.log(e)
      }
    }

    getData();
  }, [])
  

  return (
    <>
    <section className='flex justify-center py-10'>
      <div className='flex flex-col gap-5'>
        <div className='w-full flex justify-center'>
          <h1 className='text-base font-bold'>Bienvenido {localStorage.getItem("docente")}</h1>
        </div>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 '>
          <Cards Data={Data} type={"AtributosEgreso"} />
        </div>
      </div>
    </section>
    </>
  )
}

export default CardSection