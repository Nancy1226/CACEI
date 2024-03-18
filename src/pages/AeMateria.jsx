import React from 'react'
import Navbar from '../components/organism/Navbar'
import CardMateria from '../components/organism/CardMateria'
import { useParams } from 'react-router-dom'

function AeMateria() {
  const {id} = useParams()

  return (
    <>
        <Navbar/>
        <CardMateria id_AE={id}/>
    </>
  )
}

export default AeMateria