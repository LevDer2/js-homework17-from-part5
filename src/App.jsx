import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
  const submit = (e) => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const normalizedName = name.toLowerCase().trim();
    const contactIncludes = contacts.some(
      (contact) => contact.name.toLowerCase().trim() === normalizedName,
    );
    if (contactIncludes) {
      alert("The contact is already there, please write new contact");
    } else {
      setContacts([...contacts, newContact]);
      setNumber("");
      setName("");
    }
  };

  const delet = (id) => {
    setContacts((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <form onSubmit={submit}>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Number</h2>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Add contact</button>
      </form>
      <h2>Contacts</h2>
      <div>
        <p>Find contacts name</p>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ul>
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
            <button type="button" onClick={() => delet(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
