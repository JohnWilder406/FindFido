import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router';
import AdoptButton from './AdoptButton';
import { Container, Card, Row, Col } from 'react-bootstrap';

const PetDetail = (props) => {
    const {id} = props;
    const [pet, setPet] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then((res) => {
                console.log(res.data);
                setPet(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id]);

    const afterAdoptHandler = () => {
        navigate('/');
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
            <h1>Details about:  {pet.name}</h1>
            </Col>
            <Col>
            <AdoptButton 
                id={id}
                afterAdoptHandler={afterAdoptHandler} 
                adoptLabel={pet.name}
                />
            </Col>
            </Row>
            <Card className="border border-dark">
                <Card.Body variant="flush" className="mb-3" >
                    <Row>
                        <Col sm={2}>
                            <Card.Title>Type:</Card.Title>
                        </Col>
                        <Col>
                            <Card.Text>{pet.type}</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Card.Title>Description:</Card.Title>
                        </Col>
                        <Col>
                            <Card.Text>{pet.description}</Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Card.Title>Skills:</Card.Title>
                        </Col>
                        <Col>
                            <Card.Text>{pet.skill1}</Card.Text>
                            <Card.Text>{pet.skill2}</Card.Text>
                            <Card.Text>{pet.skill3}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PetDetail;