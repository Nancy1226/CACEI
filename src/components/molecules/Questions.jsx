import React from 'react'
import derecha from '../../assets/right.svg'
import Title from '../atoms/Title'
import Paragraph from '../atoms/Paragraph'

function Questions() {
  return (
    <>
        <section className='flex flex-col gap-2 w-full '>
            <div className='w-full border-[1.5px] bg-white h-16 flex flex-row items-center justify-center gap-12 p-3 py-2 rounded-lg'>
                <a className=' cursor-pointer font-bold text-[#662481] underline underline-offset-8'>Grupo A</a>
                <a className=' cursor-pointer '>Grupo B</a>
                <a className=' cursor-pointer '>Grupo C</a>
            </div>

            <div className='w-full relative border-[1.5px] bg-white h-screen rounded-lg overflow-hidden overflow-y-scroll'>
              <div className='flex flex-row gap-4 border-b p-1 justify-end pr-4 md:hidden'>   
                <div className='flex items-center pl-1'>
                  <Title level="h2" text="Angel Jair Tagua Gonzalez"/>
                </div>
                <hr className='bg-[#dfdfdf] h-auto w-[1px]' />
                <div>
                  <Paragraph text="211223" />
                  <hr className='bg-[#dfdfdf] h-auto w-[1px]' />
                  <Title level="h2" text="Software"/>
                </div>
              </div>
                
                <div className=' absolute bottom-3 right-4'>
                  <button className=' flex items-center justify-center bg-[#654BD2] text-white px-4 py-2  rounded-full'>Siguiente <img className='text-center' src={derecha} alt="" /></button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Questions