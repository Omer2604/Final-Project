import PropTypes from "prop-types";
import "../../../css/CardTable.css";

const CardTable = ({ cards }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <th>תיאור</th>
          <th>מחיר</th>
          <th>שם המוצר</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => {
          const { title, description, price } = card;
          return (
            <tr>
              <td>{description}</td>
              <td>{price}</td>
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
