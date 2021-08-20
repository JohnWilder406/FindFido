import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router'
import {Container, Table, Col, Row, Button, Nav, Navbar, Card} from 'react-bootstrap'
import io from 'socket.io-client';
import AdoptButton from './AdoptButton';
import Search from './Search';


// sort function for pet type
function Sort(array) {
    const sorted = array.sort((a,b) => (a.type > b.type) ? 1 : -1)

    return sorted
}

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [petsDefault, setPetsDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [ socket ] = useState( () => io(":8000") )

//socket.io function
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

    //database call for pet array
    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then((res) => {
                console.log(res.data)
                setPets(res.data)
                setPetsDefault(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    //adopt button handler- deletes pet from page when adopted
    const afterAdoptHandler = (adoptedPet) => {
        console.log('Adopted!')
        let filteredPetArray = pets.filter((pet) => {
            return pet._id !== adoptedPet
        })

        setPets(filteredPetArray)
    }

    //search filter- filters page to deliver search results
    const updateInput = async (searchQuery) => {
        const filtered = petsDefault.filter(pet => {
            if(pet.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return pet.name.toLowerCase().includes(searchQuery.toLowerCase())
            }
        })

        setSearchQuery(searchQuery);
        setPets(filtered)
    }
    //sort function call
    const sortPets = Sort(pets)


    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Find Fido</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={(e) => navigate('/pets/new')}>Add a Pet</Button>
                </Nav>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <Card>
                <Card.Header className="text-center" as="h3">These pets are looking for a good home</Card.Header>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <td>Pet Name</td>
                            <td>Type</td>
                            <td>Actions</td>
                            <td>Adopt Pet</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortPets.map((pet, idx) => {
                                return (
                                    <tr key={idx}><td>{pet.name}</td><td>{pet.type}</td><td><Button style={{width: "200px"}}onClick={(e) => navigate('/pets/' + pet._id)}>Details</Button>  <Button style={{width: "200px", marginRight: "5px"}} onClick={(e) => navigate('/pets/' + pet._id + '/edit')}>Edit</Button></td><td><AdoptButton id={pet._id} afterAdoptHandler={afterAdoptHandler} adoptLabel={pet.name} /></td></tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Card>
        </Container>
    )
}

export default AllPets;