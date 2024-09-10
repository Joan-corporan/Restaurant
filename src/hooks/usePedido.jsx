import { useState, useEffect } from "react";
import axios from "axios";

const PEDIDOS_URL = "http://localhost:8080/api/pedidos/join";

export const usePedido = () => {
  const [pedidos, setPedidos] = useState([])


  const getPedidos = async () => {
    try {
      const { data } = await axios.get(PEDIDOS_URL);
      setPedidos(data || [])
    
    } catch (error) {
      console.error("Error al obtener los pedidos", error);
    }
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return { pedidos,getPedidos };
};
