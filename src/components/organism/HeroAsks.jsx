import React from "react";
import CardsAlum from "../molecules/CardsAlum";
import Questions from "../molecules/Questions";

function HeroAsks() {
  return (
    <>
      <div className="flex justify-center">
        <section className="grid grid-cols-1 md:grid-cols-5 md:space-x-10 pl-2 pr-2 md:pr-0 md:pl-0  py-7  max-w-6xl w-full ">
          <div className=" md:col-span-1 hidden md:flex">
            <CardsAlum />
          </div>
          <div className=" w-full md:col-span-4">
            <Questions />
          </div>
        </section>
      </div>
    </>
  );
}

export default HeroAsks;
