import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./routes/AppRouter";

export const Restaurant=()=> {

  return (
    <BrowserRouter>
      <AppRouter/> 
    </BrowserRouter>
  )

}

