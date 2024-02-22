import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap"
import { getTemplateById, editTemplate, editAnswerTemplate, deleteTemplate } from "../../modules/templateManager";
import { getCategories, getByTemplateId, addCategoryTemplate, deleteCategoryTemplate } from "../../modules/categoryManager";
import ITemplate from "../../interfaces/ITemplate";
import IUser from "../../interfaces/IUser";
import ICategory from "../../interfaces/ICategory";
import IAnswerTemplate from "../../interfaces/IAnswerTemplate";

const EditTemplate: React.FC<{ userProfile: IUser }> = ({userProfile}) => {
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const existingTemplateId = params.id ? parseInt(params.id, 10) : 0;
    const [ existingTemplate, setExistingTemplate ] = useState<ITemplate>({
        id: 0,
        userId: 0,
        user: null,
        title: '',
        answerTemplates: [],
        categories: []
    });
    const [ template, setTemplate ] = useState<ITemplate>({
        id: 0,
        userId: 0,
        user: null,
        title: '',
        answerTemplates: [{
            id: 0,
            templateId: 0,
            position: 0,
            content: '',
            partOfSpeech: ''
        }],
        categories: []
    });
    const [ categories, setCategories ] = useState<ICategory>([]);
    const [ oldCategoryArray, setOldCategoryArray] = useState<number[]>([]);
    const [ newCategoryArray, setNewCategoryArray] = useState<number[]>([]);
    const [ sentences, setSentences ] = useState<IAnswerTemplate[]>([]);
    
    useEffect(() => {
        const getAllCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        const getExistingTemplate = async () => {
            const templateData = await getTemplateById(existingTemplateId);
            setExistingTemplate(templateData);
            setSentences(templateData.answerTemplates);
            setOldCategoryArray(templateData.categories.map((c) => c.id));
        };

        getAllCategories();
        getExistingTemplate();
    }, [existingTemplateId]);

    const setSentenceInputFunction = (i: number) => (updatedSentence: IAnswerTemplate) => {
        const updatedSentences = [...sentences];
        updatedSentences[i] = updatedSentence;
        setSentences(updatedSentences);
    };

    const categoryDelete = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCategoryArray = newCategoryArray.filter((c) => c !== parseInt(evt.target.value));
        setNewCategoryArray(updatedCategoryArray);
    };

    const categoryHelper = (template: ITemplate) => {
        oldCategoryArray.forEach((c) => {
            if (!newCategoryArray.includes(c)) {
                const newCategoryTemplate = { templateId: template.id, categoryId: c };
                deleteCategoryTemplate(newCategoryTemplate);
            }
        });

        newCategoryArray.forEach((c) => {
            if (!oldCategoryArray.includes(c)) {
                const newCategoryTemplate = { templateId: template.id, categoryId: c };
                addCategoryTemplate(newCategoryTemplate);
            }
        });
    };
    
    /*
        a sorting function to help with managing category selection on submit
        if category has been removed from template, send delete request
        to categoryTemplates table. if category has been added to
        template then send a post request to categoryTemplates
    */


    const submitTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editTemplate(template);
            await Promise.all(sentences.map((s) => editAnswerTemplate(s)));
            categoryHelper(template);
            navigate(`templates/${template?.id}`);
        } catch (error) {
            console.error("Error submitting template: ", error);
        }
    };

    const deleteFunction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const confirmation = window.confirm("Are you sure you want to deete this template?");
            if (confirmation) {
                await deleteTemplate(existingTemplateId);
                window.alert("Template has been deleted!");
                navigate("/userposts");
            }
        } catch (error) {
            console.error("Error deleting template: ", error);
        }
    };

    // quick authorization check
    const unauthorizedMessage = <p>You are not authorized to make edits to templates that are not your own! Shame on you!</p>;
    if (existingTemplate?.userId !== userProfile?.id) return unauthorizedMessage;
    else return (
        <>
            <header className="create-header">Edit Template</header>
            <div className="input-container">
                <h1>HOW THIS WORKS:</h1>
                <ul>
                    <li>MadLibs on this site are made up of ten sentences</li>
                    <li>Each sentence can only contain ONE blank</li>
                    <li>Enter your sentence in the upper text box and put a "@input" (without quotations) where you want the blank to be</li>
                    <li>In the second box, enter the TYPE of word that you require to complete the sentence</li>
                    <li>Do this for all ten lines</li>
                    <li>At the bottom of the page, choose which category would best fit your new story</li>
                    <li>Hit the submit button and your new template should be added!</li>
                </ul>
            </div>
            <Form onSubmit={submitTemplate}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        value={template.title}
                        type="text"
                        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                    />
                </FormGroup>
                <div className="input-container">
                    {sentences.map((sentence, i) => (
                        <FormGroup key={`sentence--${i}`}>
                            <Label>Sentence {i + 1}</Label>
                            <Input
                                defaultValue={sentence.content}
                                type="text"
                                onChange={(e) => {
                                    const updatedSentence = { ...sentence, content: e.target.value };
                                    setSentenceInputFunction(i)(updatedSentence);
                                }}
                            />
                            <Label>Part of Speech:</Label>
                            <Input
                                defaultValue={sentence.partOfSpeech}
                                type="text"
                                onChange={(e) => {
                                    const updatedSentence = { ...sentence, partOfSpeech: e.target.value };
                                    setSentenceInputFunction(i)(updatedSentence);
                                }}
                            />
                        </FormGroup>
                    ))}
                </div>
                <div className="input-container">
                    <div className="checkbox-form">{categories.map((c) => (
                        <div key={`cat--${c.id}`} className="mx-3">
                            <p className="cb-label">{c.name}</p>
                            <Input
                                type="checkbox"
                                checked={newCategoryArray.includes(c.id)}
                                defaultValue={c.id.toString()}
                                onChange={(evt) => {
                                    if (!newCategoryArray.includes(parseInt(evt.target.value))) {
                                        setNewCategoryArray((previousState) => [...previousState, parseInt(evt.target.value)]);
                                    } else {
                                        categoryDelete(evt);
                                    }
                                }}
                            />
                        </div>
                    ))}</div>
                </div>
                <div className="edit-btn-container">
                    <button type="submit" className="input-container" color="success">
                        Save Changes
                    </button>
                    <button className="input-container bg-danger" onClick={deleteFunction}>
                        Delete Template
                    </button>
                </div>
            </Form>
        </>
    )
};

export default EditTemplate;