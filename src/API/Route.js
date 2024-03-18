import axios from "axios";

axios.defaults.withCredentials = true

export const login = async (datos) => {
    return await axios.post("http://localhost:4000/api/v1/signin", datos, {withCredentials: true})
}

export const getAtributosEgreso = async () => {
    return await axios.get("http://localhost:4000/api/v1/getAE", {withCredentials: true})
}

export const logout = async() => {
    return await axios.get("http://localhost:4000/api/v1/logout", {withCredentials: true})
}

export const getAE_Materias = async(id_AE) => {
    return await axios.get(`http://localhost:4000/api/v1/getAE_Materias/${id_AE}`)
}

export const getAlumnos_Materia = async(id_grupo) => {
    return await axios.get(`http://localhost:4000/api/v1/getAlumnos/${id_grupo}`)
}


export const getIndicadores_Aspectos = async(id_AE) => {
    return await axios.get(`http://localhost:4000/api/v1/getIndicadoresAspectos/${id_AE}`)
}

export const sentEvaluaciones = async(data) => {
    return await axios.post(`http://localhost:4000/api/v1/evaluaciones`, data)
}