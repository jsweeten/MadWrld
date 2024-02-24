import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap"
import { getTemplateById, addMadLib } from "../../modules/templateManager";
import IUser from "../../interfaces/IUser";
import ITemplate from "../../interfaces/ITemplate";

const TemplateForm:React.FC<{ userProfile:IUser | null }> = ({userProfile}) => {
    const [ currentTemplate, setCurrentTemplate ] = useState<ITemplate | null>(null);
    const [ answerInputs, setAnswerInputs ] = useState<string[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const templateData = await getTemplateById(parseInt(id ?? '', 10));
                setCurrentTemplate(templateData);
                const initialInputs = templateData.answerTemplates?.map(() => '');
                if (initialInputs) setAnswerInputs(initialInputs);
            } catch (error) {
                console.error("Error fetching template: ", error);
            }
        };
        fetchTemplate();
    }, [id]);

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...answerInputs];
        updatedInputs[index] = value;
        setAnswerInputs(updatedInputs);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentTemplate) {
            addMadLib(answerInputs, currentTemplate?.id ?? 0)
                .then(() => navigate("/userposts"))
                .catch(error => console.error("Error adding MadLib:", error));
        }
    };

    return (
        <>
            {currentTemplate && (
                <>
                    <header>{currentTemplate.title}</header>
                    <Form onSubmit={handleSubmit}>
                        <div className="input-container">
                            {currentTemplate.answerTemplates?.map((answerTemplate, index) => (
                                <FormGroup key={index}>
                                    <Label>{answerTemplate.partOfSpeech}</Label>
                                    <Input
                                        type="text"
                                        value={answerInputs[index]}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, e.target.value)
                                        }
                                    />
                                </FormGroup>
                            ))}
                        </div>
                        <div className="edit-btn-container">
                            <button
                                type="submit"
                                className="input-container"
                                color="success"
                            >
                                Save
                            </button>
                            {currentTemplate.userId === userProfile?.id && (
                                <button
                                    className="input-container bg-danger"
                                    onClick={() => navigate(`/templates/edit/${currentTemplate.id}`)}
                                >
                                    Edit / Delete
                                </button>
                            )}
                        </div>
                    </Form>
                </>
            )}
        </>
    );
};

export default TemplateForm;