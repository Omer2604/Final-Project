import React from "react";
import PageHeader from "../common/pageHeader";
import { getCards } from "../../services/cardService";
import CardExtends from "../common/Cards/CardExtends";
import { Navigate } from "react-router-dom";
import FavoriteCards from "../common/Cards/FavCards";

class MyFavoriteCards extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMounted: false,
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ data, cards: data, isMounted: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const cards = [...this.state.cards];
    const { isMounted } = this.state;
    const { user } = this.props;
    if (!user) return <Navigate to="/" />;
    if (!isMounted) return null;

    return (
      <React.Fragment>
        <PageHeader
          title="מועדפים"
          subTitle="כאן תוכלו לראות את כל מה שסימנתם בלייק"
        />

        <div className="container">
          <FavoriteCards
            cards={cards}
            user={user}
            changeLikeStatus={this.changeLikeStatus}
            handleDelete={this.handleDelete}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MyFavoriteCards;
