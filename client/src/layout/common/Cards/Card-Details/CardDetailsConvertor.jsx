import { useParams } from "react-router-dom";
import CardDetails from "./CardDetails";
const CardDetailsConvertor = () => {
  const { id } = useParams();
  return <CardDetails id={id} />;
};

export default CardDetailsConvertor;
