import React, { useState, useEffect } from "react";
import MadLibCard from "./MadLibCard";
import { getMadLibsByUserId } from "../../modules/madlibManager";

export default function UserMadLibs() {
    
    const [ madlibsList, setMadLibsList ] = useState([]);

    const getAllMadLibs = () => {
        getMadLibsByUserId().then(madlibData => setMadLibsList(madlibData));
    }

    useEffect(() => {
        getAllMadLibs()
    }, []);

    return (
        <section>
            <div>
                <header>Your MadLibs</header>
            </div>
            <div className="madlib-card-container">
                {madlibsList?.map(madlib => 
                    < MadLibCard madlib={madlib} key={madlib.id} />
                )}
            </div>
        </section>
    )
}