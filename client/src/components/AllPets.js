import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from '@reach/router'
import {Container, Table, Col, Row} from 'react-bootstrap'
import io from 'socket.io-client';

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

    const sortPets = Sort(pets)


    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <h1 className="header">Pet Shelter</h1>
                </Col>
                <Col sm={4}>
                    <Link to="/pets/new" className="headlink" >add a pet to the shelter</Link>
                </Col>
            </Row>
            <h2>These pets are looking for a good home</h2>
            <Table bordered striped>
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
                                <tr key={idx}><td>{pet.name}</td><td>{pet.type}</td><td><Link to={'/pets/' + pet._id}>details</Link> | <Link to={'/pets/' + pet._id + '/edit'}>edit</Link></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default AllPets;