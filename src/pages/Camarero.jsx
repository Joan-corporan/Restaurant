import Modal from "../components/Modal";
import ModalPedido from "../components/ModalPedido";
import "../styles/Camarero.css";
import { useMesaData } from "../hooks/useMesaData";

export const Camarero = () => {
  const {
    dataMesa,
    modalType,
    mesaIdModal,
    openModal,
    closeModal,
    handlePedidoEntregado,
    handlePagado,
  } = useMesaData();

  return (
    <div className="App">
      <div className="container-grid">
        {dataMesa?.map((mesa) => (
          <div key={mesa.id_mesa} className="card">
            <div className="card-image">
              <img src="../public/mesa2.png" alt="imagen de mesa con copas" />
            </div>
            <div className="card-info">
              <h5>{mesa.estado_mesa}</h5>
              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "pedido tomado" ? "disabled" : ""
                }`}
                onClick={() => openModal(mesa.id_mesa, "tomarPedido")}
                disabled={mesa.estado_mesa === "pedido tomado"}
              >
                Tomar pedido {mesa.id_mesa}
              </button>
            </div>
            <div className="card-buttons">
              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "Libre" ? "disabled" : ""
                }`}
                onClick={() => openModal(mesa.id_mesa, "verPedido")}
                disabled={mesa.estado_mesa === "Libre"}
              >
                Ver pedido
              </button>

              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "pedido tomado" ||
                  mesa.estado_mesa === "libre"
                    ? "disabled"
                    : ""
                }`}
                onClick={() => handlePagado(mesa.id_mesa)}
                disabled={
                  mesa.estado_mesa === "pedido tomado" ||
                  mesa.estado_mesa === "libre"
                }
              >
                Pagado
              </button>

              <button
                className="tomarPedido"
                onClick={() => handlePedidoEntregado(mesa.id_mesa)}
              >
                Pedido entregado
              </button>
            </div>
            <ModalPedido
              isOpen={modalType === "verPedido" && mesaIdModal === mesa.id_mesa}
              onClose={closeModal}
              mesa={mesaIdModal}
              onUpdateMesa={() => {}}
            />
            <Modal
              isOpen={
                modalType === "tomarPedido" && mesaIdModal === mesa.id_mesa
              }
              onClose={closeModal}
              mesa={mesaIdModal}
              onSubmit={() => {}}
              onUpdateMesa={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
