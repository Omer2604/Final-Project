import React from "react";
import { useParams } from "react-router-dom";
import CardDetails from "./CardDetails";

const CardDetailsConvertor = () => {
  const { id } = useParams();

  if (!id || id === "undefined") {
    return <div>שגיאה: התמונה חסרה או לא זמינה מסיבה מסוימת</div>;
  }

  return <CardDetails id={id} />;
};

export default CardDetailsConvertor;
