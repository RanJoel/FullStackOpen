import React from "react";
import personService from "../services/persons";

const PersonForm = ({
  newName,
  newNumber,
  persons,
  setNewName,
  setNewNumber,
  setPersons,
  setMessage,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    let found = persons.filter((person) => person.name === newName);
    if (found && found.length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = {
          name: newName,
          number: newNumber,
        };

        personService
          .update(found[0].id, personObject)
          .then((returnedObject) => {
            setPersons(
              persons.map((person) =>
                person.id !== found[0].id ? person : returnedObject
              )
            );
            setMessage({ text: `Updated ${found[0].name}`, type: "notify" });
            setTimeout(() => {
              setMessage({});
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${found[0].name} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage({});
            }, 5000);
            setPersons(persons.filter((n) => n.id !== found[0].id));
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedObject) => {
          setMessage({ text: `Added ${newName}`, type: "notify" });
          setPersons(persons.concat(returnedObject));
        })
        .catch((error) => {
          setMessage({
            text: `${error.response.data.error}`,
            type: "error",
          });
        });
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
  };

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  return (
    <form>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => handleInputChange(e, setNewName)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => handleInputChange(e, setNewNumber)}
        />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
