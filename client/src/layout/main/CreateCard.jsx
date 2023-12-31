import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { createCard } from "../../services/cardService";
import { Link, Navigate } from "react-router-dom";

class CreateCard extends Form {
  state = {
    data: {
      title: "",
      description: "",
      url: "",
    },
    errors: {},
    isCardCreated: false,
  };

  schema = {
    title: Joi.string().min(2).max(256).required().label("Title"),
    description: Joi.string().min(2).max(1024).required().label("Description"),
    url: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
  };

  doSubmit = async () => {
    try {
      const card = { ...this.state.data };
      if (!card.url) delete card.url;
      if (!card.alt) delete card.alt;
      await createCard(card);
      toast.success("הכרטיסיה נוצרה בהצלחה");
      this.setState({ isCardCreated: true });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  };

  render() {
    const { user } = this.props;
    if (!user || (user && !user.biz)) return <Navigate replace to="/" />;

    const { isCardCreated } = this.state;
    if (isCardCreated) return <Navigate replace to="/my-cards" />;

    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid pb-4">
        <div className="container">
          <PageHeader title="צור קינוח" />
          <div className="center">
            <form
              style={{
                direction: "rtl",
                maxWidth: "500px",
                margin: "50px auto",
                padding: "15px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6"
            >
              {this.renderInput("title", "כותרת")}
              {this.renderTextarea("description", "תיאור")}
              {this.renderInput("url", "תמונה")}
              {this.renderButton("צור קינוח")}

              <Link to="/my-cards">
                <span className="btn btn-danger mt-1 col-12">ביטול</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
