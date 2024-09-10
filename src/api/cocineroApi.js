import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const {SP_API_URL}=getEnv()



const cocineroApi=axios.create({

    baseURL:SP_API_URL

});

console.log({cocineroApi})


export default cocineroApi;