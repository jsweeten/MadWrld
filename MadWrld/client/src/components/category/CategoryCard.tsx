import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
    id: number;
    name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = (category: CategoryCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="mb-3" onClick={() => navigate(`/category/${category.id}`)}>
            <CardBody>
                    <CardTitle tag="h5">
                        {category.name}
                    </CardTitle>
            </CardBody>
        </div>
    )
}

export default CategoryCard;