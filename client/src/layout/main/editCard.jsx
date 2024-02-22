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
      console.log("ID before fetching card:", id);
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
      console.log("Starting doSubmit...");
      const card = { ...this.state.data };
      console.log("Card before editing:", card);

      const { id } = this.props;
      console.log("Card ID:", id);
      card._id = id;

      console.log("Editing card:", card);

      if (!card.url)
        card.url =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

      console.log("Editing card:", card);

      await editCard(card);

      console.log("Card edited successfully");
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

              <div className="row mt-2">
                <div className="col-12 mb-2">
                  <button className="btn btn-primary btn-lg col-12">
                    אישור
                  </button>
                </div>
                <div className="col-12">
                  <Link to="/gallery" className="btn btn-danger btn-lg col-12">
                    ביטול
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
