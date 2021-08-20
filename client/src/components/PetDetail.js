import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router';
import AdoptButton from './AdoptButton';
import { Container, Card, Row, Col, Button, Nav, Navbar, Table } from 'react-bootstrap';

const PetDetail = (props) => {
    const {id} = props;
    const [pet, setPet] = useState({});
    const [like, setLike] = useState();
    const [isDisabled, setIsDisabled] = useState(false);

    //database call to get pet information
    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then((res) => {
                console.log(res.data);
                setPet(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            setLike(pet.likes)
    }, [id, pet.likes]);

    //adopt handler- navigates back to home
    const afterAdoptHandler = () => {
        navigate('/');
    }

    //like function- adds like total to page
    const likePet = (e) => {
        e.preventDefault();
        setLike(like + 1);
        setIsDisabled(true)
    }

    //like effect- updates database like total
    useEffect(() => {
        axios.put('http://localhost:8000/api/pets/' + id, {likes: like})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, like])

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Find Fido</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={(e) => navigate('/')}>Home</Button>
                </Nav>
                {
                    isDisabled ? <Button style={{width: "200px", marginLeft: "30px", marginRight: "20px"}} variant="success" onClick={(e)=>likePet(e)} disabled >Like {pet.name}</Button>
                : <Button style={{width: "200px", marginLeft: "30px", marginRight: "20px"}} variant="success" onClick={(e)=>likePet(e)}>Like {pet.name}</Button>
                }
                <AdoptButton 
                id={id}
                afterAdoptHandler={afterAdoptHandler} 
                adoptLabel={pet.name}
                />
            </Navbar>
            <Card className="border border-dark">
                    <Card.Header className="text-center" as={"h2"}> More about {pet.name}</Card.Header>
                    <Card.Body variant="flush" className="mb-3 text-lg-center" >
                    <Table bordered striped>
                        <thead>
                            <th>Animal Type</th>
                            <th>Description</th>
                            <th>Skill 1</th>
                            <th>Skill 2</th>
                            <th>Skill 3</th>
                            <th>Likes</th>
                        </thead>
                        <tbody>
                            <td>{pet.type}</td>
                            <td>{pet.description}</td>
                            <td>{pet.skill1}</td>
                            <td>{pet.skill2}</td>
                            <td>{pet.skill3}</td>
                            <td>{like}</td>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PetDetail;