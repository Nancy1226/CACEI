import React from "react";
import Cards from "../molecules/Cards";
import { useEffect, useState } from "react";
import { getAE_Materias } from "../../API/Route";

function CardMateria ({id_AE}) {
  const [Data, setData] = useState([])
  useEffect(() => {
    const getData = async() => {
      try{
        const response = await getAE_Materias(id_AE)
        setData(response.data)
      }catch(e){
        console.log(e)
      }
    }

    getData();
  }, [])
  
  // Aca meteremos al LS el id_AE
  localStorage.setItem("id_AE", id_AE)

  return (
    <>
      <div className="flex justify-center py-10">
        <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 ">
          <Cards Data={Data} type={"Signature"} />
        </section>
      </div>
    </>
  );
}

export default CardMateria;
