import { CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ITemplate from '../../interfaces/ITemplate';

const TemplateCard:React.FC<{template: ITemplate}> = ({template}) => {
    const navigate= useNavigate();

    return (
        <div className="template-card" onClick={() => navigate(`/templates/${template.id}`)}>
            <CardBody>
                    <CardTitle tag="h5">
                        {template.title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2"
                        tag="h6"
                    >
                        Created by user {template?.user?.firstName}
                    </CardSubtitle>
            </CardBody>
        </div>
    )
}

export default TemplateCard;