import React from "react";
import CardsAlum from "../molecules/CardsAlum";
import { useEffect, useState } from "react";
import { getAlumnos_Materia, getIndicadores_Aspectos } from "../../API/Route";
import Title from "../atoms/Title";
import { sentEvaluaciones } from "../../API/Route";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function HeroAsks({ id_grupo }) {
  const [Alumnos, setAlumnos] = useState([])
  const [Indicadores, setIndicadores] = useState([])
  const [currentAlumnoIndex, setCurrentAlumnoIndex] = useState(0);
  const navigate = useNavigate()
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
          aspectos: [], // Almacenamos los objetos completos aqui
        };
      }
      // Se almacena el objeto Aspecto completo
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
      id_grupo: id_grupo,
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
              <CardsAlum alumno={currentAlumno}/>
            ) : (<CardsAlum alumno={cargando}/>)}

          </div>
          <div className="border border-gray-300 p-3 rounded-lg col-span-4">
            <div className="flex items-center justify-end pr-4 ">
              {
                currentAlumno ? (
                  <>
                    <p className="text-xl font-semibold">{currentAlumnoIndex+1}/{Alumnos.length}</p>
                  </>
                ): (<p>"cargando"</p>)
              }
            </div>
           

            {currentAlumno ? (
              <>
                <div className=" flex h-10 px-1 lg:hidden mb-10">
                  <Title level={"h1"} text={`Evaluando a: ${currentAlumno.nombre}`} />
                </div>
                <Formik
                  initialValues={getInitialValues(currentAlumno)}
                  enableReinitialize={true}
                  onSubmit={async (values, actions) => {
                    let alumnos = getInitialValues(currentAlumno)
                    let numAlumnos = Object.keys(alumnos).length
                    let sumatoria = numAlumnos + Indicadores.length
                    try {
                      if (Object.keys(values).length < sumatoria) {
                        Swal.fire({
                          title: "¡¡Atención!!",
                          text: "Complete el formulario, para poder continuar.",
                          icon: "warning"
                        });
                      } else {
                        const response = await sentEvaluaciones(values);
                        if (response.status === 200) {
                            let alumnoActual = currentAlumnoIndex + 1
                          if (alumnoActual == Alumnos.length) {
                            Swal.fire({
                              icon: "success",
                              title: "Ha concluido con todas las evaluaciones satisfactoriamente.",
                              showConfirmButton: true
                            }).then(() => {
                              navigate("/dashboard");
                            });
                          } else {
                            Swal.fire({
                              icon: "success",
                              title: "Guardo exitosamente",
                              showConfirmButton: true,
                              timer: 1500,
                            });
                            handleNextAlumno()
                            actions.resetForm()
                          }
                        }
                      }
                    } catch (error) {
                      Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: "Complete el formulario",
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
                          <h1 className="text-base font-bold">{"CD "}{`${index + 1}. ${indicador.nombre_indicador}`}</h1>
                          {indicador.aspectos.map((aspecto, index2) => (
                            <div className="px-5" key={aspecto.id_aspecto}>
                              <h2 className="text-base font-semibold">{"I: "}{`${index2 + 1}. ${aspecto.nombre_aspecto}`}</h2>
                              <div className="">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                                  <label className="flex flex-row gap-4">
                                    <input
                                      type="checkbox"
                                      name={`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`}
                                      value="1"
                                      checked={values[`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`] === "1"}
                                      onChange={(e) => {
                                        setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, e.target.checked ? "1" : "");
                                      }}
                                    />
                                    Poco
                                  </label>
                                  <label className="flex flex-row gap-4">
                                    <input
                                      type="checkbox"
                                      name={`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`}
                                      value="2"
                                      checked={values[`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`] === "2"}
                                      onChange={(e) => {
                                        setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, e.target.checked ? "2" : "");
                                      }}
                                    />
                                    Debajo del promedio
                                  </label>
                                  <label className="flex flex-row gap-4">
                                    <input
                                      type="checkbox"
                                      name={`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`}
                                      value="3"
                                      checked={values[`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`] === "3"}
                                      onChange={(e) => {
                                        setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, e.target.checked ? "3" : "");
                                      }}
                                    />
                                    Promedio
                                  </label>
                                  <label className="flex flex-row gap-4">
                                    <input
                                      type="checkbox"
                                      name={`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`}
                                      value="4"
                                      checked={values[`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`] === "4"}
                                      onChange={(e) => {
                                        setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, e.target.checked ? "4" : "");
                                      }}
                                    />
                                    Superior al promedio
                                  </label>
                                  <label className="flex flex-row gap-4">
                                    <input
                                      type="checkbox"
                                      name={`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`}
                                      value="5"
                                      checked={values[`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`] === "5"}
                                      onChange={(e) => {
                                        setFieldValue(`id_aspecto_${aspecto.id_aspecto}_id_Indicador_${indicador.id_indicador}`, e.target.checked ? "5" : "");
                                      }}
                                    />
                                    Excelente
                                  </label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className=" flex justify-end gap-3">
                                           
              <button type="button" className="block py-2 bg-[#714ddf] px-4 text-white font-bold rounded-3xl" onClick={handleNextAlumno}>Siguiente</button>
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
