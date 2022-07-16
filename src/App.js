import React from "react";
import { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [source, setSource] = useState();
  const [title, setTitle] = useState();
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setSource(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newUser = () => {
    setTitle("");
    setValue("");
    fetchData();
  };

  const handleName = () => {
    setTitle("my name is:");
    setValue(
      `${source[0].name.title} 
      ${source[0].name.first}
      ${source[0].name.last}`
    );
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={source ? source[0].picture.medium : defaultImage}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">{title}</p>
              <p className="user-value">{value}</p>
              <div className="values-list">
                <button className="icon" data-label="name">
                  <img
                    src={source[0].gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                    onClick={() => handleName()}
                  />
                </button>
                <button className="icon" data-label="email">
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button className="icon" data-label="age">
                  <img src={womanAgeSvg} alt="age" id="iconImg" />
                </button>
                <button className="icon" data-label="street">
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button className="icon" data-label="phone">
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button className="icon" data-label="password">
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button className="btn" type="button" onClick={() => newUser()}>
                  new user
                </button>
                <button className="btn" type="button">
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="body-tr"></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}

export default App;