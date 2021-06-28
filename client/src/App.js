import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Router} from '@reach/router';
import AllPets from './components/AllPets';
import PetDetail from './components/PetDetail';
import AddPet from './components/AddPet';
import UpdatePet from './components/UpdatePet';



function App() {
  return (
    <div className="App">
      <Router>
        <AllPets path='/' />
        <AddPet path='/pets/new' />
        <PetDetail path='/pets/:id' />
        <UpdatePet path='/pets/:id/edit' />
      </Router>
    </div>
  );
}

export default App;
