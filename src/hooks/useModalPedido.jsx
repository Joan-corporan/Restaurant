// useModalPedido.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useModalPedido = (mesa) => {
  const endpointVerPedido = "http://localhost:4000/api/restaurant/verPedido";
  const endpointUpdatePedido = "http://localhost:4000/api/restaurant/updatePedido";
  const endpointGetProducts = "http://localhost:4000/api/restaurant/product";
  
  const [pedido, setPedido] = useState(null);
  const [totalPedido, setTotalPedido] = useState(0);
  const [productos, setProductos] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [drinkQuantity, setDrinkQuantity] = useState(1);

  useEffect(() => {
    const fetchPedido = async () => {
      if (mesa) {
        try {
          const { data } = await axios.get(endpointVerPedido, {
            params: { id_mesa: mesa },
          });
          setPedido(data.pedido);
          calcularTotalPedido(data.pedido);
        } catch (error) {
          console.log("No hay pedido aun");
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(endpointGetProducts);
        setProductos(data);
        setFoodOptions(data.filter(producto => producto.categoria_id === 601)); 
        setDrinkOptions(data.filter(producto => producto.categoria_id === 600)); 
      } catch (error) {
        console.log("No hay productos aun ");
      }
    };

    fetchPedido();
    fetchProducts();
  }, [mesa]);

  const calcularTotalPedido = (pedido) => {
    if (pedido) {
      let total = 0;
      pedido.comida.forEach((item) => {
        total += item.price * item.cantidad;
      });
      pedido.bebida.forEach((item) => {
        total += item.price * item.cantidad;
      });
      setTotalPedido(total);
    }
  };

  const handleAddFood = () => {
    if (selectedFood) {
      const producto = productos.find(p => p.id_product === parseInt(selectedFood));
      if (producto) {
        const updatedPedido = { ...pedido };
        const foodItem = {
          id: selectedFood,
          cantidad: foodQuantity,
          name_product: producto.name_product,
          price: producto.price,
        };
        updatedPedido.comida.push(foodItem);
        setPedido(updatedPedido);
        calcularTotalPedido(updatedPedido);
        setSelectedFood("");
        setFoodQuantity(1);
      }
    }
  };

  const handleAddDrink = () => {
    if (selectedDrink) {
      const producto = productos.find(p => p.id_product === parseInt(selectedDrink));
      if (producto) {
        const updatedPedido = { ...pedido };
        const drinkItem = {
          id: selectedDrink,
          cantidad: drinkQuantity,
          name_product: producto.name_product,
          price: producto.price,
        };
        updatedPedido.bebida.push(drinkItem);
        setPedido(updatedPedido);
        calcularTotalPedido(updatedPedido);
        setSelectedDrink("");
        setDrinkQuantity(1);
      }
    }
  };

  const handleUpdatePedido = async (onUpdateMesa) => {
    if (pedido && mesa) {
      try {
        const updatedPedido = { ...pedido, id_mesa: mesa };
        await axios.put(endpointUpdatePedido, updatedPedido);
        alert("Pedido actualizado con éxito");
        if (onUpdateMesa) onUpdateMesa(); 
      } catch (error) {
        console.error("Error al actualizar el pedido:", error);
      }
    } else {
      console.error("Pedido o ID de mesa no están definidos.");
    }
  };

  return {

    //Properties
    pedido,
    totalPedido,
    foodOptions,
    drinkOptions,
    selectedFood,
    selectedDrink,
    drinkQuantity,
    foodQuantity,


    //Methods
    setSelectedFood,
    setSelectedDrink,
    setFoodQuantity,
    setDrinkQuantity,
    handleAddFood,
    handleAddDrink,
    handleUpdatePedido,
  };
};

