import axios from 'axios';


const camarerosApi=axios.create({


    baseURL:VITE_API_URL

});

export default camarerosApi;