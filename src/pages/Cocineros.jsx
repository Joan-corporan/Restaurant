import { CardPedido } from "../components/CardPedido";
import '../styles/Cocinero.module.css'


export const Cocinero = () => {
  return (
    <div
      className="d-flex flex-wrap align-items-start  full-background"
      style={{
        backgroundColor: "grey",
        minHeight: "100vh",
        width: "100%",
        padding: "0", 
        margin: "0",
      }}
    >
      <CardPedido />
    </div>
  );
};
