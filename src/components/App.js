import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then(r => r.json())
      .then(toys => setToys(toys))
  }, []);

  function handleClick() {
    console.log("Now I work")
    setShowForm((showForm) => !showForm);
  }

  function handleAddtoy(newToy) {
    setToys([...toys, newToy])
  }

  function handleDeleteToy(toyDelete) {
    const updatedToys = toys.filter((toy) => toy.id !== toyDelete.id);
    setToys(updatedToys);
  }

  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map(toy => toy.id === updatedToy.id ? updatedToy : toy);
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddtoy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}  
      />
    </>
  );
}

export default App;
