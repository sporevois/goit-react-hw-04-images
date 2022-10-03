import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ url, tag, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);
    return () => {
      return window.removeEventListener('keydown', onCloseModal);
    };
  });

  const onCloseModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onCloseModal}>
      <div className={styles.modal}>
        <img className={styles.modalImg} src={url} alt={tag} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
