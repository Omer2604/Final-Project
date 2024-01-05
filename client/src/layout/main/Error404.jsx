import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/pageHeader";
import "../../css/Error404.css";

const Error404 = () => {
  return (
    <div className="container text-center mt-5">
      <PageHeader
        title="Error 404 - Page Not Found"
        subTitle="אופס! נראה שהגעת לדף שלא קיים"
      />
      <div className="mt-3">
        <Link className="error404Contact btn btn-primary" to="/contact">
          לחץ כאן כדי לדווח על הבעיה
        </Link>
      </div>
    </div>
  );
};

export default Error404;
