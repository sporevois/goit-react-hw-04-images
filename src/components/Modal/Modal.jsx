import { Component } from "react";
import { createPortal } from "react-dom";
import styles from "../Modal/Modal.module.css";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

    componentDidMount () {
        window.addEventListener('keydown', this.closeModal)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === "Escape") {
          this.props.closeModal();
        }
    }

    render() {
        const { closeModal } = this;
        const { url, tag } = this.props;
        return createPortal(
            <div className={styles.overlay} onClick={closeModal}>
                <div className={styles.modal}>
                    <img className={styles.modalImg} src={url} alt={tag} />
                </div>
            </div>,
        modalRoot)
    }  
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
}