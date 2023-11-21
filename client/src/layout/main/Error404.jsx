import PageHeader from "../common/pageHeader";
import { Link } from "react-router-dom";
import "../../css/Error404.css";
import React from "react";

const Error404 = () => {
  return (
    <div className="container">
      <PageHeader
        title="Error 404 - Page Not Found"
        subTitle="אופס! נראה שהגעת לדף שלא קיים"
      />
      <Link className="error404Contact" to="contact">
        לחץ כאן כדי לדווח על הבעיה
      </Link>
    </div>
  );
};

export default Error404;
