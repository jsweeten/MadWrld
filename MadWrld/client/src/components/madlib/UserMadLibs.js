import React, { useState, useEffect } from "react";
import MadLibCard from "./MadLibCard";
import { Link, useNavigate } from "react-router-dom";
import { getMadLibsByUserId } from "../../modules/madlibManager";
import { getTemplatesByUserId } from "../../modules/templateManager";
import { CardSubtitle, CardTitle, Card, Button } from "reactstrap";

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
    }, []);

    useEffect(() => {
        getUserTemplates()
    }, []);

    const templatesOrNah = () => {
        if (userTemplatesList?.length > 0) {
            return userTemplatesList.map(t => 
                <div key={`template--${t.id}`}>
                    <Card >
                        <Link to={`/templates/${t.id}`}>
                            <CardTitle>{t.title}</CardTitle>
                            <CardSubtitle>Created By User {t.user.firstName}</CardSubtitle>
                        </Link>
                    </Card>
                    <Button onClick={() => navigate(`/templates/edit/${t.id}`)}>
                        Edit Template
                    </Button>
                </div>
            )
        } else {
            return (
            <Card>
                <Link to="/templates/create">
                <CardTitle>Click To Create Your First MadLib Template!</CardTitle>
                </Link>
            </Card>)
        }
    }

    const templatesList = templatesOrNah()

    return (
        <>
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
            <section>
                <div>
                    <header>Your Templates</header>
                </div>
                <div className="template-card-container">
                    {templatesList}
                </div>
            </section>
        </>
    )
}