import React from "react";
import personService from "../services/persons";

const Person = ({ persons, nameFilter, setPersons, setMessage }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const confirmDelete = (person, id) => {
    if (window.confirm(`Delete ${person} ?`)) {
      personService
        .deletePerson(id)
        .then((returnedObject) => {
          setPersons(persons.filter((n) => n.id !== id));
        })
        .catch((error) => {
          setMessage({
            text: `Information of ${person} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage({});
          }, 5000);
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  return (
    <>
      {filteredPersons.map((person, index) => {
        return (
          <div key={index}>
            {person.name} {person.number}{" "}
            <button onClick={() => confirmDelete(person.name, person.id)}>
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Person;
