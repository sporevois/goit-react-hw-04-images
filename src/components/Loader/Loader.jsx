import { Watch } from "react-loader-spinner";
import styles from "../Loader/Loader.module.css"
import PropTypes from 'prop-types';

const Loader = ({isLoading}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.clock}>
            <Watch
                height="120"
                width="120"
                radius="48"
                color="#9246AD"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={isLoading}
            />
            </div>
        </div>
    )
}

export default Loader;

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired
}