import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import Loader from "./Loader";
import "./Exchange.css";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const exchangesPerPage = 10;

  useEffect(() => {
    const getExpenseData = async () => {
      const { data } = await axios.get(`${baseUrl}/exchanges`);
      if (data) {
        setLoading(false);
        setExchanges(data);
      }
    };
    getExpenseData();
  }, []);

  const indexOfLastExchange = currentPage * exchangesPerPage;
  const indexOfFirstExchange = indexOfLastExchange - exchangesPerPage;

  const Paginate = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      {exchanges
        .slice(indexOfFirstExchange, indexOfLastExchange)
        .map((exchange) => (
          <div key={exchange.id} className="ex-cards">
            <div className="image">
              <img src={exchange.image} alt={exchange.id} />
            </div>
            <div className="name">{exchange.name}</div>
            <div className="price">
              {exchange.trade_volume_24h_btc.toFixed(2)}
            </div>
            <div className="rank">{exchange.trust_score_rank}</div>
          </div>
        ))}
      <div className="pagination">
        {currentPage > 1 && (
          <span onClick={() => Paginate(currentPage - 1)}>◀</span>
        )}
        {[...Array(Math.ceil(exchanges.length / exchangesPerPage))].map(
          (_, i) => (
            <span
              key={i}
              onClick={() => Paginate(i + 1)}
              className={currentPage === i + 1 ? "page-selected" : ""}
            >
              {i + 1}
            </span>
          )
        )}
        {currentPage < Math.ceil(exchanges.length / exchangesPerPage) && (
          <span onClick={() => Paginate(currentPage + 1)}>▶</span>
        )}
      </div>
    </>
  );
};

export default Exchanges;
