import React, { useEffect } from "react";
import "../styles/CardPedido.css";
import { usePedido } from "../hooks/usePedido";

export const CardPedido = () => {
  const { pedidos, error } = usePedido();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {pedidos.length === 0 ? (
        <p>No hay pedidos disponibles</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.idPedido}
            className="card cardPedido"
            style={{ width: "14rem", margin: "10px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between headCard">
                <h5 className="card-title">Pedido:</h5>
                <p className="card-text">Mesa: {pedido.idMesa}</p>
              </div>
            </div>
            <hr className="w-100 my-1" />
            <h6 className="text-center no-space-right">Bebidas</h6>
            <p className="list-group-item no-space-right d-flex justify-content-between">
              -{pedido.nombreBebida} <span>cantidad: {pedido.cantidadBebida}</span>
            </p>

            <hr className="w-100 my-1" />

            <h6 className="text-center no-space-right">Comidas</h6>
            <p className="list-group-item no-space-right d-flex justify-content-between">
              -{pedido.nombreComida} -<span> cantidad: {pedido.cantidadComida}</span>
            </p>

            <div className="card-body">
              <button type="buttonC" className="btn btn-primary btn-block">
                Completado
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
