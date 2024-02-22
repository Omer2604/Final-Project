import PropTypes from "prop-types";
import "../../../css/CardTable.css";

const CardTable = ({ cards }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>מספר מזהה</th>
          <th>מספר לייקים</th>
          <th>שם המוצר</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card, index) => {
          const { bizNumber, title, likes } = card;
          return (
            <tr key={index}>
              {" "}
              <td>{bizNumber}</td>
              <td>{likes.length}</td>
              <td>{title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CardTable.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default CardTable;
