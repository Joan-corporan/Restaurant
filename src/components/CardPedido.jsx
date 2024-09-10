import React from "react";
import "../styles/CardPedido.css";
import { usePedido } from "../hooks/usePedido";
import { usePedidoCompletado } from "../hooks/usePedidoCompletado";

export const CardPedido = () => {
  const { pedidos, error } = usePedido();

  const { pedidoCompletado } = usePedidoCompletado();

  console.log(pedidos)

  const handleCompletado = (idPedido) => {
    pedidoCompletado(idPedido)
      .then(() => {

        console.log(`Pedido ${idPedido} completado.`);
      })
      .catch((error) => {

        console.error(`Error al completar el pedido ${idPedido}:`, error);
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {pedidos.length === 0 ? (
        <p style={{fontSize:'30px'}}>No hay pedidos disponibles</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.idPedido}
            className="card cardPedido"
            style={{ width: "14rem", margin: "10px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between headCard">
                <h5 className="card-title">Pedido: {pedido.idPedido}</h5>
                <p className="card-text">Mesa: {pedido.idMesa}</p>
              </div>
            </div>

            <hr className="w-100 my-1" />

            <h6 className="text-center no-space-right">Bebidas</h6>
            {pedido.bebidas.map((bebida, index) => (
              <p
                key={index}
                className="list-group-item no-space-right d-flex justify-content-between"
              >
                -{bebida.nombre} -<span>cantidad: {bebida.cantidad}</span>
              </p>
            ))}

            <hr className="w-100 my-1" />

            <h6 className="text-center no-space-right">Comidas</h6>
            {pedido.comidas.map((comida, index) => (
              <p
                key={index}
                className="list-group-item no-space-right d-flex justify-content-between"
              >
                -{comida.nombre} - <span> cantidad: {comida.cantidad}</span>
              </p>
            ))}

            <div >
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => handleCompletado(pedido.idPedido)}
              >
                Completado
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
