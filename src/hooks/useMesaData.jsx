import { useState, useEffect } from 'react';
import axios from 'axios';

const endpointMesa = "http://localhost:4000/api/restaurant/mesa";
const endpointLiberarMesa = "http://localhost:4000/api/restaurant/libre";
const endpointPorPagar = "http://localhost:4000/api/restaurant/entregado";

export const useMesaData = () => {
  const [dataMesa, setDataMesa] = useState([]);
  const [modals, setModals] = useState({});
  const [modalType, setModalType] = useState(null); 
  const [mesaIdModal, setMesaIdModal] = useState(null); 

  useEffect(() => {
    fetchMesaData();
  }, []);

  const fetchMesaData = async () => {
    try {
      const response = await axios.get(endpointMesa);
      const sortedData = response.data.sort((a, b) => a.id_mesa - b.id_mesa); 
      setDataMesa(sortedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const openModal = (index, type) => {
    setMesaIdModal(index);
    setModalType(type);
    setModals((prevModals) => ({
      ...prevModals,
      [index]: true,
    }));
  };

  const closeModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      [mesaIdModal]: false,
    }));
    setMesaIdModal(null);
    setModalType(null);
  };

  const updateMesaState = async () => {
    await fetchMesaData();
  };

  const handlePedidoEntregado = async (id_mesa) => {
    try {
      await axios.put(endpointPorPagar, { id_mesa });
      await updateMesaState();
    } catch (error) {
      console.error("Error al marcar pedido como entregado:", error);
    }
  };

  const handlePagado = async (mesa_id) => {
    try {
      await axios.put(endpointLiberarMesa, { id_mesa: mesa_id });
      await updateMesaState();
    } catch (error) {
      console.error("Error al marcar como pagado:", error);
    }
  };

  return {
    /* Properties */
    dataMesa,
    modals,
    modalType,
    mesaIdModal,
    /* Methods */
    openModal,
    closeModal,
    handlePedidoEntregado,
    handlePagado,
  };
};
