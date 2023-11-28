import React from "react";
import PageHeader from "../common/pageHeader";
import { getMyCards } from "../../services/cardService";
import CardExtends from "../common/Cards/CardExtends";
import Cards from "../common/Cards/cards";
import { Link, Navigate } from "react-router-dom";
import "../../css/MyCards.css";

class MyCards extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
  };

  async componentDidMount() {
    try {
      const { data } = await getMyCards();
      this.setState({ data, cards: data, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { user } = this.props;
    if (!user || (user && !user.biz)) return <Navigate replace to="/" />;

    const cards = [...this.state.cards];
    const { isMount } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
        <PageHeader
          title="הקינוחים שלי"
          subTitle="כאן תוכלו לראות את כל הקינוחים שיצרתם"
        />
        <div className="container">
          <Link to="/create-card">
            <span
              className="btn btn-primary btn-block"
              style={{
                width: "200px", // כאן יש לך את הרוחב הקבוע של הכפתור
                display: "block",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              צור כרטיסיה חדשה
            </span>
          </Link>

          <Cards
            cards={cards}
            handleDelete={this.handleDelete}
            changeLikeStatus={this.changeLikeStatus}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MyCards;
