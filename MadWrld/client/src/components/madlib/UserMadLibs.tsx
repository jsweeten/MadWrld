import React, { useState, useEffect } from "react";
import MadLibCard from "./MadLibCard";
import { useNavigate } from "react-router-dom";
import { getMadLibsByUserId } from "../../modules/madlibManager";
import { getTemplatesByUserId } from "../../modules/templateManager";
import { Card } from "reactstrap";
import TemplateCard from "../template/TemplateCard";
import "./MadLib.css";

export default function UserMadLibs() {
    const navigate = useNavigate();
    const [ madlibsList, setMadLibsList ] = useState([]);
    const [ userTemplatesList, setUserTemplatesList ] = useState([]);

    const getAllMadLibs = () => {
        getMadLibsByUserId().then(madlibData => setMadLibsList(madlibData));
    }
    const getUserTemplates = () => {
        getTemplatesByUserId().then(templateData => setUserTemplatesList(templateData));
    }

    useEffect(() => {
        getAllMadLibs()
        getUserTemplates()
    }, []);

    const templatesOrNah = () => {
        if (userTemplatesList?.length > 0) {
            return userTemplatesList?.map(t => 
                    <TemplateCard template={t} key={`template--${t.id}`}/>
            )
        } else {
            return (
            <Card 
            className="card-body"
            onClick={() => navigate("/templates/create")}>
                <div>Click To Create Your First MadLib Template!</div>
            </Card>)
        }
    }

    const templatesList = templatesOrNah()

    return (
        <div className="user-post-main">
            <section className="madlib-list">
                <div>
                    <header>Your MadLibs</header>
                </div>
                <div className="madlib-card container">
                    {madlibsList?.map(madlib => 
                        < MadLibCard madlib={madlib} key={madlib.id} />
                    )}
                </div>
            </section>
            <section className="madlib-list">
                <div>
                    <header>Your Templates</header>
                </div>
                <div className="template-card container">
                    {templatesList}
                </div>
            </section>
        </div>
    )
}