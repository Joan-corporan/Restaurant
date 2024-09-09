import React from "react";
import { useModal } from "../hooks/useModal";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, onSubmit, mesa }) => {
  const {
    productos,
    formData,
    totalPedido,
    errorValorPrecio,
    comidaOptions,
    bebidaOptions,
    handleChange,
    handleInputChange, // Agregado
    addItem,
    deleteItem,
    handleSubmit,
  } = useModal(mesa, onSubmit, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            ID Camarero:
            <input
              type="text"
              name="camarero_id"
              value={formData.camarero_id}
              onChange={handleInputChange} // Cambio aquí
            />
          </label>
          <label>
            Género:
            <select
              name="genero"
              value={formData.genero}
              onChange={handleInputChange} // Cambio aquí
            >
              <option value="">Seleccione un género</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
          <label>
            Mesa:
            <span>{formData.mesa_id}</span>
          </label>

          <div>
            <label>Comida:</label>
            {formData.comida.map((item, index) => (
              <div key={index}>
                <select
                  name="id"
                  value={item.id}
                  onChange={(e) => handleChange(e, index, "comida")}
                >
                  <option value="">Seleccione comida</option>
                  {comidaOptions.map((producto) => (
                    <option
                      key={producto.id_product}
                      value={producto.id_product}
                    >
                      {producto.name_product}- ${producto.price}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleChange(e, index, "comida")}
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => deleteItem(index, "comida")}
                >
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem("comida")}>
              Agregar Comida
            </button>
          </div>

          <div>
            <label>Bebida:</label>
            {formData.bebida.map((item, index) => (
              <div key={index}>
                <select
                  name="id"
                  value={item.id}
                  onChange={(e) => handleChange(e, index, "bebida")}
                >
                  <option value="">Seleccione bebida</option>
                  {bebidaOptions.map((producto) => (
                    <option
                      key={producto.id_product}
                      value={producto.id_product}
                    >
                      {producto.name_product}- ${producto.price}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleChange(e, index, "bebida")}
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => deleteItem(index, "bebida")}
                >
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addItem("bebida")}>
              Agregar Bebida
            </button>
          </div>
          <div>
            <p className="rojo">{errorValorPrecio}</p>
            <span>Total Pedido: ${totalPedido} </span>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
