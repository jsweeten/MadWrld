import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap';
import { getMadLibById, deleteMadLib } from '../../modules/madlibManager';

export default function MadLibDetails() {
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
            deleteMadLib(id).then(window.alert('Mad Lib has been deleted!')).then(navigate('/userposts'))
        }
    }
    
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">
                        {madlib?.template?.title}
                    </CardTitle>
                    <CardText>
                        {madlib?.story}
                    </CardText>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Created by user {madlib?.userProfile?.firstName}
                    </CardSubtitle>
                </CardBody>
            </Card>
            <div className="ml-delete-btn">
                <Button onClick={deleteFunction}>
                Delete
                </Button>
            </div>
        </>
    )
}