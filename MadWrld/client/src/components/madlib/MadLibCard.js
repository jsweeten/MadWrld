import {Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function MadLibCard({madlib}) {
    return (
        <Card>
            <Link to={`/madlibs/${madlib.id}`} >
                <CardBody>
                    <CardTitle tag="h5">
                        {madlib?.template?.title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Created by user {madlib.userProfile.firstName}
                    </CardSubtitle>
                </CardBody>
            </ Link >
        </Card>
    )
}