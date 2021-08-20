import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router';
import {Container, Row, Col, Nav, Navbar, Button} from 'react-bootstrap'
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
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Find Fido</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={(e) => navigate('/')}>Home</Button>
                </Nav>
                <Navbar.Brand>Update {pet.name}</Navbar.Brand>
            </Navbar>
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