import React from "react";
import Cards from "../molecules/Cards";
import { materias } from '../../mocks/data.json'

function CardMateria() {
  return (
    <>
      <div className="flex justify-center py-10">
        <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  md:max-w-7xl gap-6 ">
          <Cards caceis={materias}/>
        </section>
      </div>
    </>
  );
}

export default CardMateria;
