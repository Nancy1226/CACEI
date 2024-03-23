import React from 'react'
import Navbar from '../components/organism/Navbar'
import CardMateria from '../components/organism/CardMateria'
import { useParams } from 'react-router-dom'
import Headers from '../components/organism/Headers'

function AeMateria() {
  const {id} = useParams()

  return (
    <>
        {/* <Navbar/> */}
        <Headers/>
        <CardMateria id_AE={id}/>
    </>
  )
}

export default AeMateria