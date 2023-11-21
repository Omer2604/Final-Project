import PropTypes from "prop-types";

const CardTable = ({ cards }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <th></th>
          <th>שם המוצר</th>
          <th>תיאור</th>
          <th>מחיר</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card, i) => {
          const { title, description, price } = card;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{price}</td>
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
