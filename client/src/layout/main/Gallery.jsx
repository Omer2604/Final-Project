import React from "react";
import PageHeader from "../common/pageHeader";
import { getCards } from "../../services/cardService";
import CardExtends from "../common/Cards/CardExtends";
import Cards from "../common/Cards/cards";
import SearchBar from "../common/SearchBar";
import DisplayControllers from "../common/DisplayModes/DisplayControllers";
import DisplayModes from "../common/DisplayModes/DisplayModes";

class Gallery extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
    display: "cards",
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ data, cards: data, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const cards = [...this.state.cards];
    const { isMount, display } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
        <PageHeader title="גלריה" subTitle="" />
        <div className="container">
          <SearchBar
            placeholder={this.props.placeholder}
            handleChange={this.handleChange}
          />
          <DisplayControllers
            display={display}
            handleDisplay={this.handleDisplay}
          />

          {display === "table" ? (
            <DisplayModes
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.changeLikeStatus}
              display={display}
            />
          ) : (
            <Cards
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.changeLikeStatus}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Gallery;
