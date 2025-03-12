import React from "react";
import Poster from "./Poster"
import palworldImage from '../assets/images/game-images/Palworld.jpg'
import minecraftImage from '../assets/images/game-images/Minecraft.png'
import pubgImage from '../assets/images/game-images/Pubg.png'
import humanFallFlatImage from '../assets/images/game-images/HumanFF.jpg'

const posters = [
    { image: palworldImage, title:"팰월드", link:"/palworld"},
    { image: minecraftImage, title:"마인크래프트", link:"/minecraft"},
    { image: pubgImage, title:"배틀그라운드", link:"/pubg"},
    { image: humanFallFlatImage, title:"Human Fall Flat", link:"/human-fall-flat" }
]
const Home= () =>{
    return(
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
            {posters.map((poster, index) => (
                <Poster
                key={index}
                image={poster.image}
                title={poster.title}
                link={poster.link}
                />
            ))}
        </div>

    );
 };

export default Home;