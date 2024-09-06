import { Route, Routes } from "react-router-dom"
import { Cocinero } from "../pages/Cocineros"
import { Camarero } from "../pages/Camarero"


export const AppRouter=()=>{


    return (
        <Routes>
            <Route path='/' element={<Camarero/>}/>
            <Route path='/cocinero' element={<Cocinero/>}/>
        </Routes>
    )

}