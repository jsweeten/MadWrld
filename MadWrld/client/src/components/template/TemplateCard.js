import {Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Template.css";

export default function TemplateCard({template}) {
    return (
        <Card>
            <Link to={`/templates/${template.id}`} >
                <CardBody>
                    <CardTitle tag="h5">
                        {template.title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Created by user {template.user.firstName}
                    </CardSubtitle>
                </CardBody>
            </ Link >
        </Card>
    )
}