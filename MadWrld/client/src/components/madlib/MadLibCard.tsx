import { CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import IMadLib from '../../interfaces/IMadLib';


interface MadLibCardProps {
    madlib: IMadLib;
}

const MadLibCard: React.FC<MadLibCardProps> = ({madlib}) => {
    const navigate = useNavigate();

    return (
        <div className="madlib-card" onClick={() => navigate(`/madlibs/${madlib.id}`)}>
            <CardBody>
                <CardTitle tag="h5">
                    {madlib?.template?.title}
                </CardTitle>
                <CardSubtitle className="mb-2" tag="h6">
                    Created by user {madlib.userProfile.firstName}
                </CardSubtitle>
            </CardBody>
        </div>
    )
};

export default MadLibCard;