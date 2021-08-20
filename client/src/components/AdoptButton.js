import React, {useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import io from 'socket.io-client'

const AdoptButton = (props) => {
    const [ socket ] = useState( () => io(":8000") )
    const {id, afterAdoptHandler, adoptLabel} = props;

    const deleteHandler = (e, id) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/pets/' + id)
            .then((res) => {
                console.log(res.data);
                socket.emit("adopted_pet", id);
                socket.disconnect();
                afterAdoptHandler(id);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Button style={{width: "200px"}} variant="success" onClick={(e) => deleteHandler(e, id)}>Adopt {adoptLabel}</Button>
    )
}

export default AdoptButton;