import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router'
import {Container, Table, Col, Row, Button, Nav, Navbar} from 'react-bootstrap'
import io from 'socket.io-client';
import AdoptButton from './AdoptButton';

function Sort(array) {
    const sorted = array.sort((a,b) => (a.type > b.type) ? 1 : -1)

    return sorted
}

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [ socket ] = useState( () => io(":8000") )

    useEffect(() => {
        console.log("inside of the useEffect for Socket.io-client")

        socket.on("connect", () => {
            console.log('we are connected!')
            console.log(socket.id)
        })

        socket.on("added_pet", (data) => {
            setPets( (currentPetValues) => [data, ...currentPetValues] )
        })

        socket.on("remove_pet", (id) => {
            setPets( (currentPetValues) => {
                let filteredPetsArray = currentPetValues.filter((pet) => {
                    return pet._id !== id
                });
                return filteredPetsArray
            })
        })
        return () => socket.disconnect();
    },[socket])

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then((res) => {
                console.log(res.data)
                setPets(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const afterAdoptHandler = () => {
        console.log('Adopted!')
    }

    const sortPets = Sort(pets)


    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <h1 className="header">A Home for Fido</h1>
                </Col>
                <Col sm={4}>
                <Button onClick={(e) => navigate('/pets/new')}>Add a Pet to our Shelter</Button>
                </Col>
            </Row>
            <h2>These pets are looking for a good home</h2>
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <td>Pet Name</td>
                        <td>Type</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortPets.map((pet, idx) => {
                            return (
                                <tr key={idx}><td>{pet.name}</td><td>{pet.type}</td><td><Button onClick={(e) => navigate('/pets/' + pet._id)}>Details</Button>  <Button onClick={(e) => navigate('/pets/' + pet._id + '/edit')}>Edit</Button><AdoptButton id={pet._id} afterAdoptHandler={afterAdoptHandler} adoptLabel={pet.name} /></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default AllPets;