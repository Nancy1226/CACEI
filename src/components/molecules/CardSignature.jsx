import React from "react";
import Title from "../atoms/Title";
import Paragraph from "../atoms/Paragraph";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CardSignature({ caceis }) {
  const navigate = useNavigate()
  const handleClickCard = (id) => {
    console.log("Id_grupo: " + id);
    navigate(`/evaluacion/${id}`)
  }

  return (
    <>
      {caceis.map((cacei, index) => (
        <motion.article
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          key={cacei.id_grupo}
          onClick={() => handleClickCard(cacei.id_grupo)}
          className="max-w-xs md:w-[320px] h-auto border-2 bg-[#fff] hover:border-black border-dotted ease-in-out duration-300 flex flex-col rounded-2xl overflow-hidden shadow cursor-pointer"
          id={cacei.id_grupo}
        >
          <div className="relative w-full h-[130px] flex flex-row items-center justify-center bg-[#e4e1fa] rounded-2xl">
          <Title level="h4" text={cacei.cuatrimestre} />
          <Title level="h4" text={cacei.grupo} />
          </div>
          <div className="p-4 flex flex-col items-start gap-4">
            <div className="text-center w-full">
              <Title level="h1" text={cacei.materia} />
            </div>
            <div className="flex text-center w-full font-semibold">
            </div>
          </div>
        </motion.article>
      ))}
    </>
  );
}

export default CardSignature;
