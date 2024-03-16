import * as Yup from 'yup';
import Swal from "sweetalert2";
import { Form, Formik, ErrorMessage } from "formik";

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
        initialValues={{
        //   ISBN: "",
        //   titulo_libro: "",
        }}
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
            
            
            
           </Form>
        )}
      </Formik>

    </> 
    );
}

export default Login;