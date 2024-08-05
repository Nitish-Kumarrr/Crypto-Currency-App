import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import Loader from "./Loader";
import Header from "./Header";
import CoinCard from "./CoinCard";
const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : "$";
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;

  const [query, setQuery] = useState("");
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${baseUrl}/coins/markets?vs_currency=${currency}`
      );
      if (data) {
        setLoading(false);
        setCoins(data);
      }
    };
    getCoinsData();
  }, [currency]);

  const Paginate = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div className="search-bar">
        <div className="btn">
          <button
            onClick={() => setCurrency("inr")}
            style={
              currency === "inr"
                ? { backgroundColor: "white" }
                : { backgroundColor: "orange" }
            }
          >
            INR
          </button>
          <button
            onClick={() => setCurrency("usd")}
            style={
              currencySymbol === "$"
                ? { backgroundColor: "white" }
                : { backgroundColor: "orange" }
            }
          >
            USD
          </button>
        </div>
        <div className="search-coin">
          <input
            type="text"
            placeholder="Search Your Coin"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="coin-card-container">
        {coins
          .filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(indexOfFirstCoin, indexOfLastCoin)
          .map(
            ({
              id,
              image,
              name,
              current_price,
              price_change_percentage_24h,
            }) => (
              <CoinCard
                key={id}
                id={id}
                image={image}
                name={name}
                current_price={current_price}
                price_change_percentage_24h={price_change_percentage_24h}
                currencySymbol={currencySymbol}
              />
            )
          )}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <span onClick={() => Paginate(currentPage - 1)}>◀</span>
        )}
        {[...Array(Math.ceil(coins.length / coinsPerPage))].map((_, i) => (
          <span
            key={i}
            onClick={() => Paginate(i + 1)}
            className={currentPage === i + 1 ? "page-selected" : ""}
          >
            {i + 1}
          </span>
        ))}
        {currentPage < Math.ceil(coins.length / coinsPerPage) && (
          <span onClick={() => Paginate(currentPage + 1)}>▶</span>
        )}
      </div>
    </>
  );
};

export default Coins;
