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
    console.log("Pedidos originales:", pedidos);
    const pedidosAgrupados = pedidos.reduce((acc, pedido) => {
      const existingPedido = acc.find((p) => p.idPedido === pedido.idPedido);

      if (existingPedido) {
        if (pedido.nombreComida) {
          const comidaExistente = existingPedido.comidas.find(
            (c) => c.nombre === pedido.nombreComida
          );
          if (comidaExistente) {
            comidaExistente.cantidad += pedido.cantidadComida;
          } else {
            existingPedido.comidas.push({
              nombre: pedido.nombreComida,
              cantidad: pedido.cantidadComida,
            });
          }
        }

        if (pedido.nombreBebida) {
          const bebidaExistente = existingPedido.bebidas.find(
            (b) => b.nombre === pedido.nombreBebida
          );
          if (bebidaExistente) {
            bebidaExistente.cantidad += pedido.cantidadBebida;
          } else {
            existingPedido.bebidas.push({
              nombre: pedido.nombreBebida,
              cantidad: pedido.cantidadBebida,
            });
          }
        }
      } else {
        acc.push({
          idPedido: pedido.idPedido,
          idMesa: pedido.idMesa,
          estadoMesa: pedido.estadoMesa,
          comidas: pedido.nombreComida
            ? [
                {
                  nombre: pedido.nombreComida,
                  cantidad: pedido.cantidadComida,
                },
              ]
            : [],
          bebidas: pedido.nombreBebida
            ? [
                {
                  nombre: pedido.nombreBebida,
                  cantidad: pedido.cantidadBebida,
                },
              ]
            : [],
        });
      }

      return acc;
    }, []);

    console.log("Pedidos agrupados:", pedidosAgrupados);
    return pedidosAgrupados;
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return { pedidos, error };
};
