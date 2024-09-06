import { Route, Routes } from "react-router-dom"
import { Camarero } from "../pages/Camarero"
import { Cocinero } from "../pages/Cocineros"


export const AppRouter=()=>{


    return (
        <Routes>
            <Route path='/' element={<Camarero/>}/>
            <Route path='/cocinero' element={<Cocinero/>}/>
        </Routes>
    )

}