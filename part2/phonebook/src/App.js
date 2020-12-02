import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setFilter] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService.getAll().then((personList) => {
      setPersons(personList);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
      <Filter nameFilter={nameFilter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      <Person
        persons={persons}
        nameFilter={nameFilter}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
