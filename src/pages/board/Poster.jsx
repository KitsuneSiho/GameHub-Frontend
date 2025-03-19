import React from "react";
import { Link } from "react-router-dom";

const Poster = ({ image, title, link }) => {
    return (
        <div className="poster-item">
            <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                    src={image}
                    alt={title}
                    className="poster-image"
                />
                <h3>{title}</h3>
            </Link>
        </div>
    );
};

export default Poster;