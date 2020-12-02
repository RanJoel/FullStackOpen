import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((personList) => {
      setPersons(personList);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Person
        persons={persons}
        nameFilter={nameFilter}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
