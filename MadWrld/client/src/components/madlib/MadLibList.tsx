import React, { useState, useEffect } from "react";
import MadLibCard from "./MadLibCard";
import { getMadLibs } from "../../modules/madlibManager";
import IMadLib from "../../interfaces/IMadLib";
import "./MadLib.css";

const MadLibList: React.FC = () => {
    const [ madlibsList, setMadLibsList ] = useState<IMadLib[] | undefined>();

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
                {madlibsList ? (madlibsList.map(madlib => 
                    < MadLibCard madlib={madlib} key={madlib.id} />
                )) : (<section>No recent MadLibs</section>)}
            </div>
        </section>       
    )
}
export default MadLibList;