import React from 'react';
import "../styles/modal.css";
import { useModalPedido } from '../hooks/useModalPedido';

const ModalPedido = ({ isOpen, onClose, mesa, onUpdateMesa }) => {
  const {
    pedido,
    totalPedido,
    foodOptions,
    drinkOptions,
    selectedFood,
    setSelectedFood,
    selectedDrink,
    setSelectedDrink,
    foodQuantity,
    setFoodQuantity,
    drinkQuantity,
    setDrinkQuantity,
    handleAddFood,
    handleAddDrink,
    handleUpdatePedido,
  } = useModalPedido(mesa);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>Detalles del Pedido</h2>
        {pedido ? (
          <>
            <h3>ID Pedido: {pedido.id_pedido}</h3>
            <h4>Comida:</h4>
            <div>
              {pedido.comida.map((item, index) => (
                <div key={index}>
                  <p>{item.name_product} - Cantidad: {item.cantidad} - Precio: ${item.price}</p>
                </div>
              ))}
            </div>
            <h4>Bebida:</h4>
            <div>
              {pedido.bebida.map((item, index) => (
                <div key={index}>
                  <p>{item.name_product} - Cantidad: {item.cantidad} - Precio: ${item.price}</p>
                </div>
              ))}
            </div>
            <div>
              <h4>Total: ${totalPedido}</h4>
            </div>
            <h4>Agregar Comida:</h4>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">Selecciona una comida</option>
              {foodOptions.map((food) => (
                <option key={food.id_product} value={food.id_product}>
                  {food.name_product} - ${food.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={foodQuantity}
              onChange={(e) => setFoodQuantity(parseInt(e.target.value, 10))}
              min="1"
              placeholder="Cantidad"
            />
            <button onClick={handleAddFood}>Agregar Comida</button>
            <h4>Agregar Bebida:</h4>
            <select
              value={selectedDrink}
              onChange={(e) => setSelectedDrink(e.target.value)}
            >
              <option value="">Selecciona una bebida</option>
              {drinkOptions.map((drink) => (
                <option key={drink.id_product} value={drink.id_product}>
                  {drink.name_product} - ${drink.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={drinkQuantity}
              onChange={(e) => setDrinkQuantity(parseInt(e.target.value, 10))}
              min="1"
              placeholder="Cantidad"
            />
            <button onClick={handleAddDrink}>Agregar Bebida</button>
            <button onClick={() => handleUpdatePedido(onUpdateMesa)}>Actualizar Pedido</button>
          </>
        ) : (
          <p>No hay pedido para esta mesa.</p>
        )}
      </div>
    </div>
  );
};

export default ModalPedido;
