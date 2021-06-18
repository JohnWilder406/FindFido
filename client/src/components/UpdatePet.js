import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router';
import {Container, Row, Col} from 'react-bootstrap'
import PetForm from './PetForm';

const UpdatePet = (props) => {
    const {id} = props;
    const [errors, setErrors] = useState({});
    const [pet, setPet] = useState({})

    useEffect(()=> {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then((res) => {
                console.log(res.data);
                setPet(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pets/' + id, pet)
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
        <Row>
            <Col sm={8}>
                <h1>Edit {pet.name}</h1>
            </Col>
        </Row>
        <PetForm
            pet={pet}
            setPet={setPet}
            errors={errors}
            handleSubmit={handleSubmit}
            submitLabel={"Edit Pet"} />
    </Container>
    )
}

export default UpdatePet;