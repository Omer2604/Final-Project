import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCard } from "../../../../services/cardService";
import { getDate } from "../../../../services/timeService";
import PageHeader from "../../pageHeader";
import CardInfo from "./CardInfo";
import { Link, Navigate } from "react-router-dom";
import "../../../../css/CardDetails.css";

class CardDetails extends Component {
  state = {
    isMounted: false,
    card: null,
    error: "",
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: card } = await getCard(id);
      this.setState({ isMounted: true, card });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { isMounted, error, card } = this.state;
    if (error) return <Navigate to="/error" />;
    if (!isMounted || !card) return <div>Loading...</div>;

    const {
      title,
      subTitle,
      description,
      image: { url, alt },
      price,
      likes,
      createdAt,
      bizNumber,
    } = card;

    return (
      <div className="container">
        <PageHeader
          title="פרטים נוספים"
          subTitle="כאן ניתן לראות פרטים נוספים על המוצר"
        />

        <div className="row">
          <div className="col-12 col-md-4 center">
            <div>
              <h3>{title}</h3>
              <p>{subTitle || "תת-כותרת לא זמינה"}</p>
              <hr />
              <CardInfo
                title="מספר לייקים"
                description={likes.length.toString()}
              />
              <CardInfo title="מחיר" description={price} />
              <CardInfo title="תאריך פרסום" description={getDate(createdAt)} />
              <CardInfo title="תיאור" description={description} />
              {bizNumber && (
                <CardInfo title="מספר מזהה" description={bizNumber} />
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 center">
            <img className="img-fluid" src={url} alt={alt || "תמונה חסרה"} />
          </div>
        </div>

        <div className="center">
          <Link className="text-dark mt-2" to="/gallery">
            חזרה לגלריה
          </Link>
        </div>
      </div>
    );
  }
}

CardDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CardDetails;
