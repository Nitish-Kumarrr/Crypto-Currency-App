import React, { useEffect, useState } from "react";
import { baseUrl } from "./baseUrl";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import "./CoinDetails.css";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from "./CoinChart";
const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [coinDetail, setCoinDetail] = useState([]);
  const profit = coinDetail.market_data?.price_change_percentage_24h > 0;
  const { id } = useParams();
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/coins/${id}`);
        if (data) {
          setLoading(false);
          setCoinDetail(data);
        }
      } catch (error) {
        console.log("CoinDetails :: error ::", error);
        setLoading(false);
      }
    };
    getCoinDetails();
  }, [id]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="coins-container">
        <div className="coin-details">
          <div className="coin-info">
            <div className="btn">
              <button
                style={
                  currencySymbol === "₹"
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "orange" }
                }
                onClick={() => setCurrency("inr")}
              >
                inr
              </button>
              <button
                onClick={() => setCurrency("usd")}
                style={
                  currencySymbol === "$"
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "orange" }
                }
              >
                usd
              </button>
            </div>
            <div className="time">last updated: {coinDetail.last_updated}</div>
            <div className="coin-image">
              <img
                height={"150px"}
                src={coinDetail.image.large}
                alt={coinDetail.id}
              />
            </div>
            <div className="coin-name">{coinDetail.name}</div>
            <div className="coin-price">
              {currencySymbol} {coinDetail.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              {profit ? (
                <BiSolidUpArrow color="green" />
              ) : (
                <BiSolidDownArrow color="red" />
              )}
              {coinDetail.market_data.price_change_percentage_24h} %
            </div>
            <div className="market-rank">
              <IoPulseOutline color="orange" />#{coinDetail.market_cap_rank}
            </div>
            <div className="coin-desc">
              <p> {coinDetail.description["en"].split(".")[0]} </p>
            </div>
          </div>
          <div className="chart-container">
            <CoinChart currency={currency} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
