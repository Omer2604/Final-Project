import EditCard from "./editCard";
import { Navigate, useParams } from "react-router-dom";

const EditCardConvertor = ({ user }) => {
  const { id } = useParams();
  if (!user || (user && !user.biz)) return <Navigate replace to="/" />;
  return <EditCard id={id} />;
};

export default EditCardConvertor;
