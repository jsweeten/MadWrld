import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardText } from 'reactstrap';
import { getMadLibById, deleteMadLib } from '../../modules/madlibManager';

const MadLibDetails: React.FC = ({userProfile}) => {
    const [ madlib, setMadLib ] = useState();
    const { id } = useParams();
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
            deleteMadLib(id).then(() => window.alert('Mad Lib has been deleted!')).then(navigate('/userposts'))
        }
    }
         
    let madeByUser = null
    
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
                        tag="h6"
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