import { useState } from 'react';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm({ onSubmitData }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmitData(name, number);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

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

ContactForm.propTypes = {
    onSubmitData: PropTypes.func.isRequired,
};
