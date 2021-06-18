import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const AdoptButton = (props) => {
    const {id, afterAdoptHandler, adoptLabel} = props;

    const deleteHandler = (e, id) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/pets/' + id)
            .then((res) => {
                console.log(res.data);
                afterAdoptHandler(id);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Button variant="danger" onClick={(e) => deleteHandler(e, id)}>Adopt {adoptLabel}</Button>
    )
}

export default AdoptButton;