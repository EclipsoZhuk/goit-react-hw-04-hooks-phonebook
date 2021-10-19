import s from './Filter.module.css';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
    return (
        <label className={s.text}>
            Find contacts by name
            <input
                placeholder="Search"
                className={s.value}
                type="text"
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
