import { useState, useEffect } from "react";
import axios from "axios";

const Pedidos = "http://localhost:4000/api/restaurant/product";
const AddPedido = "http://localhost:4000/api/restaurant/addPedido";

export const useModal = (mesa, onSubmit, onClose) => {
  const [productos, setProductos] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const [formData, setFormData] = useState({
    camarero_id: "",
    mesa_id: mesa || "",
    genero: "",
    comida: [],
    bebida: [],
  });
  const [errorValorPrecio, setErrorValorPrecio] = useState("");

  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data } = await axios.get(Pedidos);
        setProductos(data);
      } catch (er) {
        console.log("Error al cargar productos:", er);
      }
    };

    getProductos();
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mesa_id: mesa || "",
    }));
  }, [mesa]);

  useEffect(() => {
    calcularTotalPedido();
  }, [formData.comida, formData.bebida]);

  const comidaOptions = productos.filter(
    (producto) => producto.categoria_id === 601
  );
  const bebidaOptions = productos.filter(
    (producto) => producto.categoria_id === 600
  );

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const newItems = [...formData[type]];
    newItems[index][name] = value;
    setFormData({
      ...formData,
      [type]: newItems,
    });
  };

  // Nueva función para manejar los cambios en inputs regulares
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addItem = (type) => {
    const newItem = { id: "", cantidad: 1 };
    setFormData({
      ...formData,
      [type]: [...formData[type], newItem],
    });
  };

  const calcularTotalPedido = () => {
    let total = 0;

    formData.comida.forEach((item) => {
      const producto = productos.find(
        (producto) => producto.id_product === parseInt(item.id)
      );
      if (producto) {
        total += producto.price * item.cantidad;
      }
    });

    formData.bebida.forEach((item) => {
      const producto = productos.find(
        (producto) => producto.id_product === parseInt(item.id)
      );
      if (producto) {
        total += producto.price * item.cantidad;
      }
    });

    setTotalPedido(total);
    setFormData((prevFormData) => ({
      ...prevFormData,
      total_pedido: total,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (totalPedido === 0) {
        return setErrorValorPrecio(
          "Error, no puedes agregar productos con valor 0"
        );
      } else {
        setErrorValorPrecio("");
      }
      const validIds = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109];

      if (!validIds.includes(parseInt(formData.camarero_id))) {
        alert("El ID que ingresó no es el correcto");
      } else {
        await axios.post(AddPedido, formData);
        onSubmit(formData);
        onClose();
        setFormData({
          camarero_id: "",
          mesa_id: mesa || "",
          genero: "",
          comida: [],
          bebida: [],
          total_pedido: 0,
        });
        setTotalPedido(0);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  const deleteItem = (index, type) => {
    const newItems = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: newItems });
  };

  return {
    // Properties
    productos,
    formData,
    totalPedido,
    errorValorPrecio,
    comidaOptions,
    bebidaOptions,

    // Methods
    handleChange,
    handleInputChange, // Nueva función expuesta
    addItem,
    deleteItem,
    handleSubmit,
  };
};
