import React from "react";
import { Link } from "react-router-dom";

const Poster = ({ image, title, link }) => {
    return(
        <div style={{ textAlign:"center", margin:"20px" }}>
            <Link to ={link} style={{ textDecoration: 'none', color: 'inherit'}}>
            <img
            src={image}
            alt={title}
            style={{width:'200px', height:'300px', objectFit:'cover', borderRadius:'10px'}}
            />
            <h3>{title}</h3>
            </Link>
        </div>

    );
};

export default Poster;