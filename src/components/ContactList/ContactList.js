import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
    return (
        <ul>
            {contacts.map(({ id, name, number }) => (
                <li key={id}>
                    {`${name}: ${number}`}
                    <button
                        className={s.buttonDelete}
                        type="button"
                        onClick={() => onDeleteContact(id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func.isRequired,
};
