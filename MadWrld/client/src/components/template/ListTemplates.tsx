import React, { useState, useEffect } from "react";
import TemplateCard from "./TemplateCard";
import { getTemplates } from "../../modules/templateManager";
import ITemplate from "../../interfaces/ITemplate";

const ListTemplates: React.FC = () => {
    const [ templatesList, setTemplatesList ] = useState<ITemplate[]>([]);

    const getAllTemplates = () => {
        getTemplates().then(templateData => setTemplatesList(templateData))
    }

    useEffect(() => {
        getAllTemplates()
    }, []);

    return (
        <section>
            <div>
                <header>Create A MadLib From One Of Our Available Templates...</header>
            </div>
            <div className="template-card-container">
                {templatesList.map(template => 
                    < TemplateCard template={template} key={template.id} />
                )}
            </div>
        </section>
    );
}

export default ListTemplates;