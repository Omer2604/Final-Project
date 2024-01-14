import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { editCard, getCard } from "../../services/cardService";
import { Link, Navigate } from "react-router-dom";

class EditCard extends Form {
  state = {
    data: {},
    errors: {},
    isCardEdit: false,
    isMounted: false,
  };

  schema = {
    title: Joi.string().min(2).max(256).required().label("Title"),
    description: Joi.string().min(2).max(1024).required().label("Description"),
    url: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: card } = await getCard(id);
      this.setState({ isMounted: true, data: this.mapToModel(card) });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  }

  mapToModel(card) {
    const {
      title,
      description,
      image: { url },
    } = card;
    return { title, description, url };
  }

  doSubmit = async () => {
    try {
      const card = { ...this.state.data };
      const { id } = this.props;
      card._id = id;
      if (!card.url)
        card.url =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      await editCard(card);
      toast.success("העריכה בוצעה בהצלחה");
      this.setState({ isCardEdit: true });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  };

  render() {
    const { isCardEdit, isMounted } = this.state;

    if (!isMounted) return null;

    if (isCardEdit) return <Navigate replace to="/gallery" />;

    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid pb-4">
        <div className="container">
          <PageHeader title="עריכה" subTitle="" />
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
              {this.renderButton("אישור")}

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

export default EditCard;
