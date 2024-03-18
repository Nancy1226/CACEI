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
        console.log("Imprimiendo los alumnos");
        console.table(response.data)
        setAlumnos(response.data)
        console.log("Impriminedo las preguntas")
        console.log(responseIndicadores.data)
        setIndicadores(responseIndicadores.data)
      } catch (e) {
        console.log(e)
      }
    }

    getData();
  }, [])


  const handleNextAlumno = () => {
    console.log("Estamos llamando a handleNextAlumno");
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

  return (
    <>
      <div className="flex justify-center">
        <section className="grid grid-cols-1 md:grid-cols-5 md:space-x-10 pl-2 pr-2 md:pr-0 md:pl-0  py-7  max-w-6xl w-full ">
          <div className=" md:col-span-1 hidden md:flex">
            <CardsAlum />
          </div>
          <div className="border border-red-500 col-span-4">
          <div className="flex justify-end">
              <button onClick={handleNextAlumno}>Siguiente</button>
          </div>

          {currentAlumno ? (
            <>
              <Title level={"h1"} text={`Evaluando a: ${currentAlumno.nombre}`}/>
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
                      title: "Bienvenido",
                      showConfirmButton: true,
                      timer: 1500,
                    });
                    console.table(values);
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
                <Form onSubmit={handleSubmit}>
                  {agruparAspectosPorIndicador().map(indicador => (
                    <div key={indicador.id_indicador} className="gap-5">
                      <h1 className="text-xl font-bold">{indicador.nombre_indicador}</h1>
                      {indicador.aspectos.map(aspecto => (
                        <div key={aspecto.id_aspecto}>
                          <h2 className="text-base">{aspecto.nombre_aspecto}</h2>
                          <select
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
                      ))}
                    </div>
                  ))}
                  <button type="submit">Enviar</button>
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
