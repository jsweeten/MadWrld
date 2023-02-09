import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap"
import { addAnswerTemplate, addTemplate } from "../../modules/templateManager";
import { getCategories, addCategoryTemplate } from "../../modules/categoryManager";
import "./Template.css";

export default function CreateTemplate() {
    const navigate = useNavigate();
    const [ categories, setCategories ] = useState([])
    const [ categoryChoicesArray, updateCategoryChoicesArray] = useState([])
    const [ template, setTemplate ] = useState(
        {
            title: "",
            userId: 0
        })
    
    const [ sentence1, setSentence1 ] = useState(
        {
            templateId: 0,
            position: 1,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence2, setSentence2 ] = useState(
        {
            templateId: 0,
            position: 2,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence3, setSentence3 ] = useState(
        {
            templateId: 0,
            position: 3,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence4, setSentence4 ] = useState(
        {
            templateId: 0,
            position: 4,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence5, setSentence5 ] = useState(
        {
            templateId: 0,
            position: 5,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence6, setSentence6 ] = useState(
        {
            templateId: 0,
            position: 6,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence7, setSentence7 ] = useState(
        {
            templateId: 0,
            position: 7,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence8, setSentence8 ] = useState(
        {
            templateId: 0,
            position: 8,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence9, setSentence9 ] = useState(
        {
            templateId: 0,
            position: 9,
            content: "",
            partOfSpeech: ""
        }
    )
    const [ sentence10, setSentence10 ] = useState(
        {
            templateId: 0,
            position: 10,
            content: "",
            partOfSpeech: ""
        }
    )
    
    const getAllCategories = () => {
        getCategories().then(data => setCategories(data));
    }

    useEffect(() => {
        getAllCategories()
    }, []);

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
            type="text"
            onChange={(e) => {
                let copy = {...sentence}
                copy.content = e.target.value 
                let input = setSentenceInputFunction(i)
                input(copy)}}
            />
            <Label>Part of Speech:</Label>
            <Input
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
                value={c.id}
                onChange={
                    (evt) => {
                        if (!categoryChoicesArray.includes(evt.target.value)) {
                            updateCategoryChoicesArray(previousState => [...previousState, evt.target.value])
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
        const copy = [...categoryChoicesArray]
        const index = copy.indexOf(evt.target.value)
        if (index > -1) {
            copy.splice(index, 1)
            updateCategoryChoicesArray(copy)
        }
    }

    const categoryObjectArray = categoryChoicesArray.map((c) => {
        return {
            templateId: null,
            categoryId: c
        }
    })

    const submitTemplate = (e) => {
        e.preventDefault();
        addTemplate(template)
        .then((templateData) => {
            sentences.forEach((s) => {
                s.templateId = templateData.id
                addAnswerTemplate(s)})
            categoryObjectArray.forEach((ct) => {
                ct.templateId = templateData.id
                addCategoryTemplate(ct)})
        })
        .then(() => {navigate(`/templates/${template?.id}`)})};

    return (
        <>
            <header>Create A Template of Your Own!</header>
            
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
                    placeholder="Title"
                    onChange={(e) => {
                        setTemplate({title: e.target.value})}}
                    />
                </FormGroup>
                
                <div className="input-container">
                    {formInputLines}
                </div>

                <div className="checkbox-container">
                    {formCategoryCheckboxes}
                </div>

                <button type="submit"
                className="template-save-btn"
                color="success">
                    Save
                </button>
            </Form>
        </>
    )
}
