import styles from "../Button/Button.module.css"
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
    return (
        <div className={styles.buttonWrapper}>
            <button className={styles.button} type="button" onClick={onClick}>Load more</button>
        </div>
    )
}
export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}