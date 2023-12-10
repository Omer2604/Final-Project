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
    loading: true,
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ data, cards: data, isMounted: true, loading: false });
    } catch (error) {
      console.error("Error fetching cards:", error.message);
      this.setState({ loading: false });
    }
  }

  render() {
    const { cards, isMounted, loading } = this.state;
    const { user } = this.props;

    if (!user) return <Navigate to="/" />;

    return (
      <React.Fragment>
        <PageHeader
          title="מועדפים"
          subTitle="כאן תוכלו לראות את כל מה שסימנתם בלייק"
        />

        <div className="container">
          {loading && <p>Loading...</p>}
          {!loading && !isMounted && <p>Error loading cards</p>}
          {!loading && isMounted && cards.length === 0 && (
            <p>No favorite cards found.</p>
          )}
          {!loading && isMounted && cards.length > 0 && (
            <FavoriteCards
              cards={cards}
              user={user}
              changeLikeStatus={this.changeLikeStatus}
              handleDelete={this.handleDelete}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default MyFavoriteCards;
