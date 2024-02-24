import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap"
import { addAnswerTemplate, addTemplate } from "../../modules/templateManager";
import { getCategories, addCategoryTemplate } from "../../modules/categoryManager";
import IAnswerTemplate from "../../interfaces/IAnswerTemplate";

const CreateTemplate: React.FC = () => {
    const navigate = useNavigate();
    const [ template, setTemplate ] = useState({ title: '' });
    const [ categories, setCategories ] = useState([]);
    const [ categoryChoicesArray, setCategoryChoicesArray] = useState<number[]>([]);
    const [ sentences, setSentences ] = useState<Array<{ position: number; content: string; partOfSpeech: string }>>(
        Array.from({ length: 10 }, (_, i) => ({
            position: i + 1,
            content: '',
            partOfSpeech: ''
        }))
    );
    
    useEffect(() => {
        getCategories().then(data => setCategories(data));
    }, []);

    const handleInputChange = (i: number, field: string, value: string) => {
        setSentences(prevState =>
            prevState.map((sentence, index) => (index === i ? { ...sentence, [field]: value } : sentence))
        );
    };

    const handleCheckboxChange = (categoryId: number) => {
        setCategoryChoicesArray(prevState =>
            prevState.includes(categoryId)
                ? prevState.filter(id => id !== categoryId)
                : [...prevState, categoryId]
        );
    };

    const submitTemplate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const templateData =  await addTemplate(template);

            await Promise.all(
                sentences.map(async (s) => {
                    const answerTemplate: IAnswerTemplate = { ...s, templateId: templateData.id };
                    await addAnswerTemplate(answerTemplate);
                })
            );
            await Promise.all(
                    categoryChoicesArray.map(async (categoryId) => {
                        const categoryTemplate = { templateId: templateData.id, categoryId };
                        await addCategoryTemplate(categoryTemplate);
                    })
            );

            window.alert('Template has been added!');
            navigate('/userposts');
        } catch (error) {
            console.error('Error submitting template: ', error)
        };
    };

    return (
        <>
        <header className="create-header">Create A Template of Your Own!</header>
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
                <Input placeholder="Title" onChange={e => { setTemplate({...template, title: e.target.value})}} />
            </FormGroup>
            
            <div className="input-container">
                {sentences.map((sentence, i) => (
                    <FormGroup key={`sentence--${i}`} className="mb-2">
                        <Label className="mt-2">Sentence {i + 1}</Label>
                        <Input
                            type="text"
                            value={sentence.content}
                            onChange={e => handleInputChange(i, "content", e.target.value)}
                        />
                        <Label className="mt-2">Part of Speech:</Label>
                        <Input
                            type="text"
                            value={sentence.partOfSpeech}
                            onChange={e => handleInputChange(i, "partOfSpeech", e.target.value)}
                        />
                    </FormGroup>
                ))}
            </div>
            <div className="input-container">
                <div className="checkbox-form">
                    {categories.map((category: any) => (
                        <div key={`cat--${category.id}`} className="mx-3">
                            <p className="cb-label">{category.name}</p>
                            <Input
                                type="checkbox"
                                checked={categoryChoicesArray.includes(category.id)}
                                onChange={() => handleCheckboxChange(category.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="template-save-btn" color="success">
                Save
            </button>
        </Form>
        </>
    )
};
export default CreateTemplate;