import axios from "axios";


export const usePedidoCompletado = () => {
  const pedidoCompletado = async (idPedido) => {
    try {
      await axios.post(`http://localhost:8080/api/pedidos/finalizar/${idPedido}`);

        console.log('pedido completado')
        window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  return {
    pedidoCompletado
  }
};
