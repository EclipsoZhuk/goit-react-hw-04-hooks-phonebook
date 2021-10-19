import { Component } from 'react';
import initialContacts from '../../contacts.json';
import s from './App.module.css';
import Container from '../Container';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

class App extends Component {
    state = {
        contacts: initialContacts,
        filter: '',
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parseContacts = JSON.parse(contacts);
        if (parseContacts) {
            this.setState({ contacts: parseContacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }

    formSubmitHandler = data => {
        const comparableEl = this.state.contacts.some(
            el => el.name.toLowerCase() === data.name.toLowerCase(),
        );
        if (comparableEl) {
            return alert(' Контакт вже є у телефонній книзі!!!');
        }

        this.setState(({ contacts }) => ({
            contacts: [data, ...contacts],
        }));
    };

    elementDelete = (arr, idContact) => arr.filter(el => el.id !== idContact);

    setFilterToState = filterData =>
        this.setState({ ...this.state, filter: `${filterData}` });

    getVisibleContact = () => {
        const { filter, contacts } = this.state;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    changeFilter = e => this.setState({ filter: e.currentTarget.value });

    onDeleteContact = idContact => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(
                contact => contact.id !== idContact,
            ),
        }));
    };

    render() {
        const {
            formSubmitHandler,
            changeFilter,
            onDeleteContact,
            getVisibleContact,
        } = this;
        const { filter } = this.state;

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
}

export default App;
