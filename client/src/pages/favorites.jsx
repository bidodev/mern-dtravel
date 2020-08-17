import React from 'react'
import './favorites.styles.scss'

import ExperienceItem from "../components/aside/discover/experiences/experience.item.component";

import { useSelector } from "react-redux";

const openModal = () => {
    
}

function Favorites() {
    const favoritesList = useSelector((state) => state.favoritesList)
    const data = useSelector((state) => state.data)

    console.log("data", data)
    console.log("favoritesList", favoritesList)

    return (
        <div className="wrapper">
            <h2>Your Favorites</h2>
            {favoritesList.map((item) => <h2>{item.name}</h2>)}
        </div>
    )
}

export default Favorites
