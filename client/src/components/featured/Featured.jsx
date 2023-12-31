import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Featured.scss";

function Featured() {
  const [input, setInput] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 5) + 1
  );
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newRandomNumber = Math.floor(Math.random() * 10) + 1;
      setRandomNumber(newRandomNumber);
    }, 1200); // Change image every 1 second

    return () => clearInterval(interval);
  }, []); // Run the effect only once on component mount

  return (
    <div className="featured ">
      <div className="container">
        <div className="left">
          <h1 className="typewriter">
            <span>freelance services your business to</span>
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular : </span>
            <button>
              <Link className="link menuLink" to="/gigs?cat=design">
                Graphics & Design
              </Link>
            </button>
            <button>
              <Link className="link menuLink" to="/gigs?cat=Video...Animation">
                Video & Animation
              </Link>
            </button>
            <button>
              <Link className="link menuLink" to="/gigs?cat=Business">
                Business
              </Link>
            </button>
            <button>
              <Link className="link menuLink" to="/gigs?cat=music">
                Music & Audio
              </Link>
            </button>
          </div>
        </div>
        <div className="right">
          <img src={`./img/ak${randomNumber}.png`} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
