import React from "react";
import { Link } from "react-router-dom";
const CoinCard = ({
  id,
  image,
  name,
  current_price,
  price_change_percentage_24h,
  currencySymbol,
}) => {
  const profit = price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "white", textDecoration: "none" }}
    >
      <div key={id} className="coins-cards">
        <div className="image">
          <img src={image} alt={id} />
        </div>
        <div className="name">{name}</div>
        <div className="price">{`${currencySymbol}${current_price}`}</div>
        <div
          className="perc-change"
          style={profit ? { color: "green" } : { color: "red" }}
        >
          {profit
            ? "+" + price_change_percentage_24h.toFixed(2)
            : price_change_percentage_24h.toFixed(2)}
          %
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
