import React from "react";
import { useParams } from "react-router-dom";
import CardDetails from "./CardDetails";

const CardDetailsConvertor = () => {
  const { id } = useParams();

  if (!id || id === "undefined") {
    // כאן תוכל להחזיר משהו, לדוג' הודעת שגיאה או להפנות לדף 404
    return <div>Error: Card ID is missing or invalid</div>;
  }

  return <CardDetails id={id} />;
};

export default CardDetailsConvertor;
