import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById } from '../../modules/categoryManager';
import TemplateCard from '../template/TemplateCard';


export default function CategoryDetails() {
    const [ category, setCategory ] = useState();
    const { id } = useParams();

    const getCategoryDetails = () => {
        getCategoryById(id).then(data => setCategory(data));
    }

    useEffect(() => {
        getCategoryDetails()
    }, []);

    return (
        <section>
        <div>
            <header>Templates</header>
        </div>
        <div className="template-container">
            {category?.templates?.map(template => 
                < TemplateCard template={template} key={template.id}/>
            )}
        </div>
    </section>
    )
}