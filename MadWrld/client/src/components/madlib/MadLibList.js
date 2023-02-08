import React, { useState, useEffect } from "react";
import MadLibCard from "./MadLibCard";
import { getMadLibs } from "../../modules/madlibManager";

export default function MadLibList() {
    const [ madlibsList, setMadLibsList ] = useState([]);

    const getAllMadLibs = () => {
        getMadLibs().then(madlibData => setMadLibsList(madlibData));
    }

    useEffect(() => {
        getAllMadLibs()
    }, []);

    return (
        <section>
            <div>
                <header>Recent MadLibs</header>
            </div>
            <div className="madlib-card-container">
                {madlibsList.map(madlib => 
                    < MadLibCard madlib={madlib} key={madlib.id} />
                )}
            </div>
        </section>       
    )
}