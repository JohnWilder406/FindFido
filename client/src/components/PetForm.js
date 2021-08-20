import React from 'react';
import {Button, Container, Form, Row, Col} from 'react-bootstrap'

const PetForm = (props) => {
    const {pet, setPet, errors, handleSubmit, submitLabel} = props;

    //input handler
    const inputChange = (e) => {
        let newPet = { ...pet};
        if(e.target.name === "type") {
            newPet[e.target.name] = e.target.value.toLowerCase();
        } else {
            newPet[e.target.name] = e.target.value;
        }
        setPet(newPet)
    }

    return (
        <Container className="border border-dark">
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            Pet Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={pet.name}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.name ? 
                                <span className="error">{errors.name.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            Skill #1:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="skill1"
                                value={pet.skill1}
                                onChange={(e) => inputChange(e)} />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label column sm={2}>
                        Type:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="type"
                            value={pet.type}
                            onChange={(e) => inputChange(e)} />
                            {
                                errors.type ? 
                                <span className="error">{errors.type.message}</span> : null
                            }
                </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label column sm={4}>
                        Skill #2:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="skill2"
                            value={pet.skill2}
                            onChange={(e) => inputChange(e)} />
                    </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label column sm={2}>
                        Description:
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        name="description"
                        value={pet.description}
                        onChange={(e) => inputChange(e)} />
                    {
                        errors.description ? 
                        <span className="error">{errors.description.message}</span> : null
                    }
                    </Col>  
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label column sm={3}>
                        Skill #3:
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        name="skill3"
                        value={pet.skill3}
                        onChange={(e) => inputChange(e)} />
                    </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group as={Row}>
            <Col sm={{span: 3, offset: 1}}>
            <Button style={{width: "200px"}} type="submit">{submitLabel}</Button>
            </Col>
            </Form.Group>
        </Form>
    </Container>
    )
}

export default PetForm;

