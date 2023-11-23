import { Component } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteCard, changeLikeStatus } from "../../../services/cardService";

class CardExtends extends Component {
  handleDelete = (cardID) => {
    Swal.fire({
      title: "האם אתה בטוח שברצונך למחוק כרטיסיה זו?",
      showCancelButton: true,
      cancelButtonText: "ביטול",
      confirmButtonText: "מחק",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cards = [...this.state.cards];
        cards = cards.filter((card) => card._id !== cardID);
        this.setState({ cards });
        await deleteCard(cardID);
        toast.success("!הכרטיסיה נמחקה בהצלחה");
      }
    });
  };

  handleChange = (e) => {
    let cards = [...this.state.data];
    const searchTerm = e.target.value.trim();
    const cardsFiltered = cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bizNumber.includes(searchTerm.toLowerCase())
      );
    });
    this.setState({ cards: cardsFiltered });
  };

  changeLikeStatus = async (cardId, user) => {
    try {
      let cards = [...this.state.data];
      let card = cards.find((card) => card._id === cardId);
      if (!card) return;

      let cardLikes = card.likes;

      if (!cardLikes.length) {
        card.likes.push(user._id);
        this.setState({ cards });
        await changeLikeStatus(card._id);
        return;
      }

      let isUserLikedCard = cardLikes.find((id) => id === user._id);

      if (!isUserLikedCard) {
        card.likes.push(user._id);
        this.setState({ cards });
        await changeLikeStatus(card._id);
        return;
      }

      card.likes = card.likes.filter((id) => id !== user._id);
      this.setState({ cards });
      await changeLikeStatus(card._id);
      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  handleDisplay = (display) => {
    let disChange = display === "table" ? "cards" : "table";
    this.setState({ display: disChange });
  };
}

export default CardExtends;
