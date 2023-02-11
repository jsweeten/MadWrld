import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import { getTemplateById, editTemplate, editAnswerTemplate, deleteTemplate } from "../../modules/templateManager";
import { getCategories, getByTemplateId, addCategoryTemplate, deleteCategoryTemplate } from "../../modules/categoryManager";
import "./Template.css";

export default function EditTemplate() {
    const navigate = useNavigate();
    const { existingTemplateId } = useParams();
    const [ existingTemplate, setExistingTemplate ] = useState({});
    const [ template, setTemplate ] = useState({});
    const [ categories, setCategories ] = useState([]);
    const [ oldCategoryArray, setOldCategoryArray] = useState([]);
    const [ newCategoryArray, setNewCategoryArray] = useState([]);
    
    const [ sentence1, setSentence1 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 1,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence2, setSentence2 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 2,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence3, setSentence3 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 3,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence4, setSentence4 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 4,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence5, setSentence5 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 5,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence6, setSentence6 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 6,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence7, setSentence7 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 7,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence8, setSentence8 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 8,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence9, setSentence9 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 9,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence10, setSentence10 ] = useState(
        {
            id: 0,
            templateId: 0,
            position: 10,
            content: "",
            partOfSpeech: ""
        }
    )
    
    const getAllCategories = () => {
        getCategories().then(data => setCategories(data));
    }

    const getExistingTemplate = () => {
        getTemplateById(existingTemplateId).then(templateData => 
            setExistingTemplate(templateData))
    }

    const getTemplateCategories = () => {
        getByTemplateId(existingTemplateId)
        .then(categoryData => 
            (categoryData.forEach(c =>
                setOldCategoryArray(previousState =>
                    [...previousState, c.categoryId])
            ))
        )
    }

    useEffect(() => {
        getAllCategories()
        getExistingTemplate()
        getTemplateCategories()
    }, []);

    useEffect(() => {
        setNewCategoryArray(oldCategoryArray)
    }, [oldCategoryArray]);


    useEffect(() => {
        setTemplate(existingTemplate)
        sentences.forEach((s, i) => { 
            let copy = {...s}
            copy.content = existingTemplate?.answerTemplates?.at(i).content
            copy.partOfSpeech = existingTemplate?.answerTemplates?.at(i).partOfSpeech
            copy.templateId = existingTemplate?.id
            copy.id = existingTemplate?.answerTemplates?.at(i).id
            let input = setSentenceInputFunction(i)
            input(copy)})
        }, [ existingTemplate ])

    const sentences = [
        sentence1, sentence2,
        sentence3, sentence4,
        sentence5, sentence6,
        sentence7, sentence8,
        sentence9, sentence10
    ]
    
    const formInputLines = []
    const formCategoryCheckboxes = []

    sentences.forEach((sentence, i) => {
        formInputLines.push(
        <FormGroup key={`sentence--${i}`}>
            <Label>Sentence {i + 1}</Label>
            <Input
            value={sentence.content}
            type="text"
            onChange={(e) => {
                let copy = {...sentence}
                copy.content = e.target.value 
                let input = setSentenceInputFunction(i)
                input(copy)}}
            />
            <Label>Part of Speech:</Label>
            <Input
            value={sentence.partOfSpeech}
            type="text"
            onChange={(e) => {
                let copy = {...sentence}
                copy.partOfSpeech = e.target.value 
                let input = setSentenceInputFunction(i)
                input(copy)}}
            />
        </FormGroup>)
    })

    categories.forEach((c) => {
        formCategoryCheckboxes.push(
            <FormGroup key={`cat--${c.id}`}>
                <Label>{c.name}</Label>
                <Input
                type="checkbox"
                checked={newCategoryArray.includes(c.id)}
                value={c.id}
                onChange={
                    (evt) => {
                        if (!newCategoryArray.includes(parseInt(evt.target.value))) {
                            setNewCategoryArray(previousState => [...previousState, parseInt(evt.target.value)])
                        } else {
                            categoryDelete(evt)
                        }
                    }
                }
                />
            </FormGroup>
        )
    })
    
    const setSentenceInputFunction = (i) => {
        const sentenceArray = [
            setSentence1, setSentence2,
            setSentence3, setSentence4,
            setSentence5, setSentence6,
            setSentence7, setSentence8,
            setSentence9, setSentence10
        ]
        return sentenceArray[i]
    }

    const categoryDelete = (evt) => {
        const copy = [...newCategoryArray]
        const index = copy.indexOf(parseInt(evt.target.value))
        if (index > -1) {
            copy.splice(index, 1)
            setNewCategoryArray(copy)
        }
    }

    
    const categoryHelper = (template) => {
        oldCategoryArray.map(c => {
            if (!newCategoryArray.includes(c)) {
                const newCategoryTemplate = {
                    templateId: template.id,
                    categoryId: c
                    }
                deleteCategoryTemplate(newCategoryTemplate)
            }
        })
        newCategoryArray.map(c => {
            if (!oldCategoryArray.includes(c)) {
                const newCategoryTemplate = {
                templateId: template.id,
                categoryId: c
                }
                addCategoryTemplate(newCategoryTemplate)
            }
        })
    }

    const submitTemplate = (e) => {
        e.preventDefault();
        editTemplate(template)
            .then(sentences.forEach((s) => {
                editAnswerTemplate(s)}))
            .then(categoryHelper(template))
            .then(() => {navigate(`/templates/${template?.id}`)
        })
    }

    const deleteFunction = () => {
        const confirmation = window.confirm('Are you sure you want to delete this template?')
        if (confirmation) {
            deleteTemplate(existingTemplateId).then(window.alert('Template has been deleted!')).then(navigate('/userposts'))
        }
    }

    return (
        <>
            <header>Edit Template</header>
            
            <h4>How this works:</h4>
            
            <div>
                <div>MadLibs on this site are made up of ten sentences</div>
                <div>Each sentence can only contain ONE blank</div>
                <div>Enter your sentence in the upper text box and put a "@input" (without quotations) where you want the blank to be</div>
                <div>In the second box, enter the TYPE of word that you require to complete the sentence</div>
                <div>Do this for all ten lines</div>
                <div>At the bottom of the page, choose which category would best fit your new story</div>
                <div>Hit the submit button and your new template should be added!</div>
            </div>
            
            <Form onSubmit={submitTemplate}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input
                        value={template.title}
                        type="text"
                        onChange={(e) => {
                        let copy = {...existingTemplate}
                        copy.title = e.target.value 
                        setTemplate(copy)}}
                    />
                </FormGroup>
                
                <div className="input-container">
                    {formInputLines}
                </div>

                <div className="checkbox-container">
                    {formCategoryCheckboxes}
                </div>

                <div className="edit-btn-container">
                    <Button type="submit"
                    className="template-save-btn"
                    color="success">
                        Save Changes
                    </Button>
                    <Button type="delete"
                    className="template-delete-btn"
                    color="danger"
                    onClick={deleteFunction}>
                        Delete Template
                    </Button>
                </div>
            </Form>
        </>
    )
}