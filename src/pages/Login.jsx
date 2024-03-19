import * as Yup from "yup";
import Swal from "sweetalert2";
import { Form, Formik, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Title from "../components/atoms/Title";
import { login } from "../API/Route";

function Login() {
  const navigate = useNavigate()

  return (
    <>
      <Formik
        initialValues={
          {
              correo:"",
              password:""
        
          }
        }
        onSubmit={async (values, actions) => {
             try {
                const response = await login(values);
              if (response.status === 200) {
                 Swal.fire({
                   icon: "success",
                   title: "Bienvenido",
                   showConfirmButton: true,
                   timer: 1500,
                });
                console.log(response.data.docente)
                localStorage.setItem("docente", response.data.docente)
                 navigate("/dashboard")
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
            <>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="flex items-center justify-center">
                    <img src={logo} alt="" />
                  </div>
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in 
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label
                        htmlFor="correo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="correo"
                          name="correo"
                          type="email"
                          onChange={handleChange}
                          autoComplete="email"
                          required
                          className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          onChange={handleChange}
                          autoComplete="current-password"
                          required
                          className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="my-3">
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-[#662481] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#8D5BA1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign in
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
