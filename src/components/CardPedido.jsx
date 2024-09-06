import "../styles/CardPedido.css"; // Archivo de CSS personalizado

export const CardPedido = () => {
  return (
    <div className="card cardPedido" style={{ width: "14rem", margin: "10px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between headCard">
          <h5 className="card-title">Pedido: 300</h5>
          <p className="card-text">Mesa: 400</p>
        </div>
      </div>
      <hr className="w-100 my-1" />
      <h6 className="text-center no-space-right">Bebidas</h6>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Coca Cola <span>cantidad: 1</span>
      </p>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Agua <span>cantidad: 2</span>
      </p>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Jugo <span>cantidad: 3</span>
      </p>

      <hr className="w-100 my-1" />

      <h6 className="text-center no-space-right">Comidas</h6>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Porotos <span>cantidad: 1</span>
      </p>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Guatita <span>cantidad: 2</span>
      </p>
      <p className="list-group-item no-space-right d-flex justify-content-between">
        -Empanada <span>cantidad: 3</span>
      </p>

      <div className="card-body">
        <button type="buttonC" className="btn btn-primary btn-block">
          Completado
        </button>
      </div>
    </div>
  );
};
