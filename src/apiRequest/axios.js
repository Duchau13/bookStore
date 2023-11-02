import axios from "axios";
// axios.defaults.withCredentials = true; 
// export default axios.create({
//     baseURL: 'http://localhost:4000/api/v1'
// });

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    credentials: 'include',
});
export default api