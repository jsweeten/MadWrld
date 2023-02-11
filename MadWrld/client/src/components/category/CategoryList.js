import React, { useState, useEffect } from 'react';
import { getCategories } from "../../modules/categoryManager";
import { Card } from 'reactstrap';
import { Link } from "react-router-dom";
import "../template/Template.css";

export default function CategoryList() {

    const [ categoryList, setCategoryList ] = useState([]);

    const getAllCategories = () => {
        getCategories().then(data => setCategoryList(data));
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <section>
            <div>
                <header>Choose A Template From The Categories Below...</header>
            </div>
            <div className="category-container">
                {categoryList?.map(category => 
                    <Card key={category.id}>
                        <Link to={`/category/${category.id}`}>
                            <div >{category.name}</div>
                        </Link>
                    </Card>
                )}
            </div>
            <div>
                <h3>...Or <Link to="/templates/create">Click Here</Link> To Create Your Very Own Template!</h3>
            </div>
        </section>
    )
}