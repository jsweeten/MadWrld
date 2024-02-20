import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../../modules/categoryManager';
import TemplateCard from '../template/TemplateCard';
import ICategory from '../../interfaces/ICategory';

const CategoryDetails: React.FC = () => {
    const [ category, setCategory ] = useState<ICategory | undefined>();
    const params = useParams<{ id: string | undefined }>();
    const id = params.id ? parseInt(params.id, 10) : undefined;

    if (id !== undefined) {
        const getCategoryDetails = () => {
        getCategoryById(id).then(data => setCategory(data));
        };
        
        useEffect(() => {
            getCategoryDetails()
        }, []);   
    }
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

export default CategoryDetails;