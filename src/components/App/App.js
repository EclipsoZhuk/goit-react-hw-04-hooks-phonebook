import { useState, useEffect } from 'react';
import initialContacts from '../../contacts.json';
import { v4 as uuidv4 } from 'uuid';
import s from './App.module.css';
import Container from '../Container';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

export default function App() {
    const [contacts, setContacts] = useState(() => {
        return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const formSubmitHandler = (name, number) => {
        const contact = {
            id: uuidv4(),
            name,
            number,
        };

        if (
            contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase(),
            )
        ) {
            alert(`${name} is already in contacts.`);
        } else if (contacts.find(contact => contact.number === number)) {
            alert(`${number} is already in contacts.`);
        } else if (!name.trim() || !number.trim()) {
            alert("Enter the contact's name and number phone!");
        } else {
            setContacts(prevContacts => [...prevContacts, contact]);
        }
    };

    const getVisibleContact = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    const changeFilter = e => setFilter(e.target.value);

    const onDeleteContact = idContact => {
        setContacts(contacts.filter(({ id }) => id !== idContact));
    };

    return (
        <Container>
            <h1 className={s.title}>Phonebook</h1>
            <ContactForm onSubmitData={formSubmitHandler} />
            <h2 className={s.contactTitle}>Contacts</h2>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
                contacts={getVisibleContact()}
                onDeleteContact={onDeleteContact}
            />
        </Container>
    );
}
