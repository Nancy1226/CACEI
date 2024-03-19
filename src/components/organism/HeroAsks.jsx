import React from "react";
import CardsAlum from "../molecules/CardsAlum";
import Questions from "../molecules/Questions";
import { useEffect, useState } from "react";
import { getAlumnos_Materia, getIndicadores_Aspectos } from "../../API/Route";
import Title from "../atoms/Title";
import Paragraph from "../atoms/Paragraph";
import { sentEvaluaciones } from "../../API/Route";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";

function HeroAsks({ id_grupo }) {
  const [Alumnos, setAlumnos] = useState([])
  const [Indicadores, setIndicadores] = useState([])
  const [currentAlumnoIndex, setCurrentAlumnoIndex] = useState(0);
 
  const id_AE = localStorage.getItem("id_AE")


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAlumnos_Materia(id_grupo)
        const responseIndicadores = await getIndicadores_Aspectos(id_AE)
        setAlumnos(response.data)
        setIndicadores(responseIndicadores.data)
      } catch (e) {
        console.log(e)
      }
    }

    getData();
  }, [])


  const handleNextAlumno = () => {
    if (currentAlumnoIndex < Alumnos.length - 1) {
      setCurrentAlumnoIndex(currentAlumnoIndex + 1);
    }
  };

  const agruparAspectosPorIndicador = () => {
    const agrupados = {};
    Indicadores.forEach(indicador => {
      if (!agrupados[indicador.id_indicador]) {
        agrupados[indicador.id_indicador] = {
          nombre_indicador: indicador.nombre_indicador,
          id_indicador: indicador.id_indicador,
          aspectos: [], // Ahora almacenaremos objetos completos de aspecto aquí
        };
      }
      // Almacenamos el objeto completo de aspecto en lugar de solo su nombre
      agrupados[indicador.id_indicador].aspectos.push({
        id_aspecto: indicador.id_aspecto,
        nombre_aspecto: indicador.nombre_aspecto,
      });
    });
    return Object.values(agrupados);
  };

  const currentAlumno = Alumnos.length > 0 ? Alumnos[currentAlumnoIndex] : null;


  const getInitialValues = (alumno) => {
    return {
      id_alumno: alumno.id_alumno,
      id_materia: alumno.id_materia,
      id_docente: alumno.id_docente,
      id_AE: localStorage.getItem("id_AE"),
      cuatrimestre: alumno.cuatrimestre,
      grupo: alumno.grupo,
    };
  };

  const cargando = {
    nombre: "cargando",
    matricula: "cargando"
  }

  return (
    <>
      <div className="flex justify-center">
        <section className="grid grid-cols-1 lg:grid-cols-5 md:space-x-10 pl-2 pr-2 md:pr-0 md:pl-0  py-7  max-w-6xl w-full ">
          <div className=" hidden lg:flex">
            {currentAlumno ? (
              <CardsAlum alumno={currentAlumno} total={Alumnos.length} actual={currentAlumnoIndex}/>
            ): (<CardsAlum alumno={cargando} total={0} actual={0}/>)}
            
          </div>
          <div className="border border-gray-300 p-3 rounded-lg col-span-4">
          <div className="flex justify-end ">
              <button className="block py-2 bg-[#714ddf] px-4 text-white font-bold rounded-3xl" onClick={handleNextAlumno}>Siguiente</button>
          </div>

          {currentAlumno ? (
            <>
              <div className=" flex h-10 px-1 lg:hidden">
                <Title level={"h1"} text={`Evaluando a: ${currentAlumno.nombre}`}/>
              </div>
              <Formik
              initialValues={getInitialValues(currentAlumno)}
              enableReinitialize={true}
              onSubmit={async (values, actions) => {
                console.log("Imprimiendo los valores")
                
                console.log(values)
                try {
                  const response = await sentEvaluaciones(values);
                  if (response.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Guardo exitosamente",
                      showConfirmButton: true,
                      timer: 1500,
                    });
                    actions.resetForm()
                  }
                } catch (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Intente de nuevo",
                    footer: 'Si el problema persiste intentelo mas tarde'
                  });
                  console.log(error);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                setFieldValue,
              }) => (
                <Form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
                {agruparAspectosPorIndicador().map((indicador, index) => (
                  <div key={indicador.id_indicador} className="flex flex-col gap-3 px-5">
                    <h1 className="text-base font-bold">{`${index + 1}. ${indicador.nombre_indicador}`}</h1>
                    {indicador.aspectos.map(aspecto => (
                      <div className="px-5" key={aspecto.id_aspecto}>
                        <h2 className="text-base font-semibold">{aspecto.nombre_aspecto}</h2>
                       <div className="">
                        <select
                            className=" bg-transparent border border-[#989898] text-black p-2 flex rounded-lg"
                            
                            id={`respuesta_${aspecto.id_aspecto}`}
                            name={`respuesta_${aspecto.id_aspecto}`}
                            value={values[`respuesta_${aspecto.id_aspecto}`]}
                            onChange={(e) => {
                              const { value } = e.target;
                              setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, value);
                            }}
                          >
                            <option value="">Seleccione una opción</option>
                            <option value="1">Poco</option>
                            <option value="2">Debajo del promedio</option>
                            <option value="3">Promedio</option>
                            <option value="4">Superior al promedio</option>
                            <option value="5">Excelente</option>
                          </select>
                       </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className=" flex justify-end">
                  <button className="p-2 px-5 bg-[#216dd7] block text-white font-bold rounded-full" type="submit">Enviar</button>
                </div>
              </Form>
              )}
            </Formik>
            </>
          ) : (
            <Title>Cargando...</Title>
          )}
          </div>
        </section>
      </div>
    </>
  );
}

export default HeroAsks;
