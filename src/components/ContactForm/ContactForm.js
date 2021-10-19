import { Component } from 'react';
import s from './ContactForm.module.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    static propTypes = {
        onSubmitData: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        number: '',
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        const { name, number } = this.state;
        e.preventDefault();

        const contact = {
            id: uuidv4(),
            name,
            number,
        };
        this.props.onSubmitData(contact);
        this.reset();
    };

    reset = () => this.setState({ name: '', number: '' });

    render() {
        const { handleSubmit, handleChange } = this;
        const { name, number } = this.state;

        return (
            <div className={s.contactForm}>
                <form type="submit" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                            required
                            onChange={handleChange}
                            value={name}
                        />
                    </label>
                    <label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                            required
                            onChange={handleChange}
                            value={number}
                        />
                    </label>

                    <button type="submit">Add contact</button>
                </form>
            </div>
        );
    }
}

export default ContactForm;
