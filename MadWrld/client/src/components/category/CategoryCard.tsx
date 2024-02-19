import { CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({category}) {
    const navigate= useNavigate();

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