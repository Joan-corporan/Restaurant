import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";

export const Restaurant=()=> {

  return (
    <BrowserRouter>
    
      <AppRouter/>
    
    </BrowserRouter>
  )

}

