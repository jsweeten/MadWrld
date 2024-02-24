import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardText } from 'reactstrap';
import { getMadLibById, deleteMadLib } from '../../modules/madlibManager';
import IUser from '../../interfaces/IUser';

interface MadLibDetailsProps {
    userProfile: IUser | null;
}

const MadLibDetails: React.FC<MadLibDetailsProps> = ({userProfile}) => {
    const params = useParams<{ id: string }>();
    const id = params.id ? parseInt(params.id, 10) : 0;
    const [ madlib, setMadLib ] = useState({
        id: 0,
        templateId: 0,
        userProfileId: 0,
        template: {
            id: 0,
            user: null,
            userId: 0,
            title: '',
            answerTemplates: [],
            categories: []
        },
        userProfile: {
            firstName: null,
            lastName: null,
            email: null
        },
        inputs: '',
        story: '',
    });
    const navigate = useNavigate();

    const getMadLibDetails = () => {
        getMadLibById(id).then(madlibData => setMadLib(madlibData));
    }

    useEffect(() => {
        getMadLibDetails()
    }, []);

    const deleteFunction = () => {
        const confirmation = window.confirm('Are you sure you want to delete this Mad Lib?')
        if (confirmation) {
            deleteMadLib(id).then(() =>
            window.alert('Mad Lib has been deleted!'))
            .then(() => navigate('/userposts'));
        }
    }
         
    let madeByUser = null;
    
    if (madlib?.userProfileId === userProfile?.id)
        {
        madeByUser =
            <button className="input-container bg-danger"
            onClick={deleteFunction}>
                Delete MadLib
            </button>
        }
    
    
    return (
        <>
            <Card className="input-container">
                    <h1>
                        {madlib?.template?.title}
                    </h1>
                    <CardText>
                        {madlib?.story}
                    </CardText>
                    <h4
                        className="mb-2"
                    >
                        Created by user {madlib?.userProfile?.firstName}
                    </h4>
            </Card>
            <div className="edit-btn-container">
                {madeByUser}
                <button
                    className="input-container"
                    onClick={() => navigate(`/templates/${madlib?.templateId}`)}>
                    Create Another Using This Template
                </button>
            </div>
        </>
    )
}

export default MadLibDetails;