import React from "react";
import CardSignature from "../molecules/CardSignature";
import { materias } from '../../mocks/data.json'
import { useEffect, useState } from "react";
import { getAE_Materias } from "../../API/Route";

function CardMateria ({id_AE}) {
  const [Data, setData] = useState([])
  useEffect(() => {
    const getData = async() => {
      try{
        const response = await getAE_Materias(id_AE)
        console.log("Imprimiendo el response de las materias");
        console.table(response.data)
        setData(response.data)
      }catch(e){
        console.log(e)
      }
    }

    getData();
  }, [])
  
  console.log("Estoy recibiendo el parametro de la url en CardMateria: ", id_AE)
  return (
    <>
      <div className="flex justify-center py-10">
        <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 ">
          <CardSignature caceis={Data}/>
        </section>
      </div>
    </>
  );
}

export default CardMateria;
