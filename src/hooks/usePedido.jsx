import { useState, useEffect } from "react";
import axios from "axios";

const PEDIDOS_URL = "http://localhost:8080/api/pedidos/join";

export const usePedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  const getPedidos = async () => {
    try {
      const { data } = await axios.get(PEDIDOS_URL);
      
      if (Array.isArray(data)) {
        const pedidosAgrupados = agruparPedidosPorId(data);
        setPedidos(pedidosAgrupados);
      } else {
        setError("La respuesta de la API no es válida.");
      }

    } catch (error) {
      console.error("Error al obtener los pedidos", error);
      setError("No se pudieron obtener los pedidos.");
    }
  };

  const agruparPedidosPorId = (pedidos) => {
    return pedidos.reduce((acc, pedido) => {
      const existingPedido = acc.find(p => p.idPedido === pedido.idPedido);

      if (existingPedido) {
        existingPedido.comidas.push({
          nombre: pedido.nombreComida,
          cantidad: pedido.cantidadComida,
        });
        existingPedido.bebidas.push({
          nombre: pedido.nombreBebida,
          cantidad: pedido.cantidadBebida,
        });
      } else {
        acc.push({
          idPedido: pedido.idPedido,
          idMesa: pedido.idMesa,
          estadoMesa: pedido.estadoMesa,
          comidas: [{
            nombre: pedido.nombreComida,
            cantidad: pedido.cantidadComida,
          }],
          bebidas: [{
            nombre: pedido.nombreBebida,
            cantidad: pedido.cantidadBebida,
          }],
        });
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return { pedidos, error };
};
