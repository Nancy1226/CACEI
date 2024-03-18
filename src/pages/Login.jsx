import * as Yup from "yup";
import Swal from "sweetalert2";
import { Form, Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Title from "../components/atoms/Title";

function Login() {
  // const validationSchema = Yup.object().shape({
  //     ISBN: Yup.string().required('Campo obligatorio'),
  //     titulo_libro: Yup.string().required('Campo obligatorio'),
  //     editorial: Yup.string().required('Campo obligatorio'),
  //     numero_edicion: Yup.string().required('Campo obligatorio'),
  //     year_publicacion: Yup.string()
  //       .matches(/^\d{4}$/, 'El año debe contener exactamente 4 números.')
  //       .required('Campo obligatorio'),
  //     titulo_capitulo: Yup.string().required('Campo obligatorio'),
  //     numero_capitulo: Yup.string().required('Campo obligatorio'),
  //     de_pagina: Yup.string().required('Campo obligatorio'),
  //     a_pagina: Yup.string().required('Campo obligatorio'),
  //     resumen: Yup.string().required('Campo obligatorio'),
  //     area: Yup.string().required('Campo obligatorio'),
  //     campo: Yup.string().required('Campo obligatorio'),
  //     disciplina: Yup.string().required('Campo obligatorio'),
  //     subdisciplina: Yup.string().required('Campo obligatorio'),
  //     apoyo_CONACYT: Yup.string().required('Campo obligatorio'),
  //   });

  return (
    <>
      <Formik
        // validationSchema={validationSchema}
        initialValues={
          {
            //   ISBN: "",
            //   titulo_libro: "",
          }
        }
        onSubmit={async (values, actions) => {
          //   try {
          //     const response = await createCapitulosPublicados(values);
          //     if (response.status === 200) {
          //       Swal.fire({
          //         icon: "success",
          //         title: "Guardado con exíto",
          //         showConfirmButton: true,
          //         timer: 1500,
          //       });
          //       console.table(values);
          //     }
          //   } catch (error) {
          //     Swal.fire({
          //       icon: "error",
          //       title: "Error...",
          //       text: "Intente de nuevo",
          //       footer: 'Si el problema persiste intentelo mas tarde'
          //     });
          //     console.log(error);
          //   }
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <Link to="dashboard">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-[#662481] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#8D5BA1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
