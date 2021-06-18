import React, { useState } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router';
import {Container, Row, Col} from 'react-bootstrap'
import PetForm from './PetForm';

const AddPet = () => {
    const [errors, setErrors] = useState({});
    const [pet, setPet] = useState({
        name:"",
        type:"",
        description:"",
        skill1:"",
        skill2:"",
        skill3:"",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets', pet)
            .then((res) => {
                console.log(res.data);
                if(res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
    <Container>
        <Row>
            <Col sm={8}>
                <h1 className="header">Pet Shelter</h1>
            </Col>
            <Col sm={4}>
                <Link to="/" className="headlink" >back to home</Link>
            </Col>
        </Row>
        <h2>Add a new pet!</h2>
        <PetForm
            pet={pet}
            setPet={setPet}
            errors={errors}
            handleSubmit={handleSubmit}
            submitLabel={"Add Pet"} />
    </Container>
    )
}

export default AddPet;