import React from 'react'
import CardMateria from '../components/organism/CardMateria'
import { useParams } from 'react-router-dom'
import Headers from '../components/organism/Headers'

function AeMateria() {
  const {id} = useParams()

  return (
    <>
        <Headers/>
        <CardMateria id_AE={id}/>
    </>
  )
}

export default AeMateria