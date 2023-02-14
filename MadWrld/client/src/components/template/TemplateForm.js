import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap"
import { getTemplateById, addMadLib } from "../../modules/templateManager";

export default function TemplateForm({userProfile}) {
    const [ currentTemplate, setCurrentTemplate ] = useState({})
    const [ partOfSpeech, setPartOfSpeech ] = useState([])
    const [ input1, setInput1 ] = useState()
    const [ input2, setInput2 ] = useState()
    const [ input3, setInput3 ] = useState()
    const [ input4, setInput4 ] = useState()
    const [ input5, setInput5 ] = useState()
    const [ input6, setInput6 ] = useState()
    const [ input7, setInput7 ] = useState()
    const [ input8, setInput8 ] = useState()
    const [ input9, setInput9 ] = useState()
    const [ input10, setInput10 ] = useState()

    const { id } = useParams();
    const navigate = useNavigate();
    
     const getCurrentTemplate = () => {
        getTemplateById(id).then(templateData => setCurrentTemplate(templateData))
    }

    const setInputFunction = (i) => {
        const inputArray = [
            setInput1, setInput2,
            setInput3, setInput4,
            setInput5, setInput6,
            setInput7, setInput8,
            setInput9, setInput10
        ]
        return inputArray[i]
    }

    useEffect(() => {
        getCurrentTemplate()
    }, [])

    useEffect(() => {
        setPartOfSpeech(wordsNeeded)
    }, [ currentTemplate ])
    
    const wordsNeeded = currentTemplate?.answerTemplates?.map(answerTemplate =>
        answerTemplate?.partOfSpeech)

    const answerArray = [input1,input2,input3,input4,input5,input6,input7,input8,input9,input10]
     
    let madeByUser = null
    
    if (currentTemplate?.userId === userProfile?.id)
        {
        madeByUser =
            <button className="input-container bg-danger"
            onClick={() => navigate(`/templates/edit/${currentTemplate.id}`)}>
                Edit / Delete
            </button>
        }
    
    const submitTemplate = (e) => {
        e.preventDefault();
        addMadLib(answerArray, currentTemplate.id).then(() => {navigate("/userposts")});
      };

    return (
        <>
            <header>{currentTemplate?.title}</header>
            
            <Form onSubmit={submitTemplate}>
                <div className="input-container">
                    {partOfSpeech?.map((word, i) =>
                    <FormGroup key={i}>
                        <Label>{word}</Label>
                        <Input
                        type="text"
                        onChange={(e) => {
                            let input = setInputFunction(i)
                            input(e.target.value)}}
                        />
                    </FormGroup>
                    )}
                </div>
                <div className="edit-btn-container">
                    <button type="submit"
                    className="input-container"
                    color="success">
                        Save
                    </button>
                    {madeByUser}
                </div>
            </Form>
        </>
    )
}