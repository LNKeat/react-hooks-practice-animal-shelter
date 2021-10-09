import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });


  function onChangeType(e){
    const animal = e.target.value
    setFilters({type:animal})
  }
  function onFindPetsClick(){
    let API = filters.type !== 'all' ? `http://localhost:3001/pets?type=${filters.type}` : 'http://localhost:3001/pets'
    fetch(API)
    .then(res => res.json())
    .then(petsData => {
      setPets(petsData)
    })
  }

  function onAdoptPet(id){
    const updatedPets = pets.map(pet => {
      if(pet.id === id){
        return {...pet, isAdopted:true}
      }else{
        return pet
      }
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
