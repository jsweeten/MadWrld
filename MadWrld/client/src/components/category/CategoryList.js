import React, { useState, useEffect } from 'react';
import { getCategories } from "../../modules/categoryManager";
import { Link } from "react-router-dom";
import CategoryCard from './CategoryCard';

export default function CategoryList() {
    const [ categoryList, setCategoryList ] = useState([]);

    const getAllCategories = () => {
        getCategories().then(data => setCategoryList(data));
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <section className="category-list mb-5">
            <div>
                <header>Choose A Template From The Categories Below...</header>
            </div>
            <div className="category-container m-5">
                {categoryList?.map(c => <CategoryCard category={c} key={c.id}/>)}
            </div>
            <div className="mb-4">
                <h2 >...OR</h2>
            </div>
            <div>   
                <a className="card-body px-5" href={"/templates/create"}>Click Here To Create Your Very Own Template!</a>
            </div>
        </section>
    )
}