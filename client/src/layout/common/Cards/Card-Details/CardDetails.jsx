import React, { Component } from "react";
import { getCard } from "../../../../services/cardService";
import { getDate } from "../../../../services/timeService";
import PageHeader from "../../pageHeader";
import CardDetailsHeader from "./CardDetailsHeader";
import CardInfo from "./CardInfo";
import { Link, Navigate } from "react-router-dom";
import "../../../../css/CardDetails.css";

class CardDetails extends Component {
  state = {
    isMounted: false,
    card: {},
    error: "",
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: card } = await getCard(id);
      this.setState({ isMounted: true, card });
    } catch (error) {
      this.setState({ errors: error.message });
    }
  }

  render() {
    const { isMounted, error } = this.state;
    if (error) return <Navigate to="/error" />;
    if (!isMounted) return null;

    const {
      title,
      subTitle,
      description,
      image: { url, alt },
      price,
      likes,
      createdAt,
    } = this.state.card;

    return (
      <div className="container">
        <PageHeader
          title="פרטים נוספים"
          subTitle="כאן ניתן לראות פרטים נוספים על המוצר"
        />

        <div className="row">
          <div className="col-12 col-md-4 center">
            <div>
              <CardDetailsHeader title={title} subTitle={subTitle} />
              <CardInfo title="מספר לייקים" description={likes.length} />
              <CardInfo title="מחיר" description={price} />
              <CardInfo title="תאריך פרסום" description={getDate(createdAt)} />
              <CardInfo title="תיאור" description={description} />
            </div>
          </div>

          <div className="col-12 col-md-4 center">
            <img className="img-fluid" src={url} alt={alt} />
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

export default CardDetails;
