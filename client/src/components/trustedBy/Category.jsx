import React from "react";
import { Link } from "react-router-dom";
import { marketsData } from "../../utils/data";
import "../trustedBy/Category.scss"

const Category = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="contain">Explore the Services</h2>
        <div className="item">
          {marketsData.map((item, i) => (
            <Link
              to={`/gigs?cat=${encodeURIComponent(item.title)}`}
              key={i}
              className="service-link"
            >
              <div className="service-image-container">
                <img src={item.icon} alt="" className="service-image" />
              </div>
              <h2 className="service-title">{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
