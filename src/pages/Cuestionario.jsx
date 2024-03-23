import React from "react";
import Questions from "../components/molecules/Questions";
import CardsAlum from "../components/molecules/CardsAlum";
import Navbar from "../components/organism/Navbar";
import HeroAsks from "../components/organism/HeroAsks";
import { useParams } from "react-router-dom";
import Headers from "../components/organism/Headers";

function Cuestionario() {
  const {id} = useParams()

  return (
    <>
        <Headers/>
        <HeroAsks id_grupo={id}/>
    </>
  );
}

export default Cuestionario;
