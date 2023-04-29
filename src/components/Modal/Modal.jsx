import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
const root = document.querySelector('#root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* {console.log('src:', this.props.src, 'alt:', this.props.alt)}
        {this.props.src && this.props.alt && (
          <img
            className={styles.modalImg}
            src={this.props.src}
            alt={this.props.alt}
          /> */}
        {children}
      </div>
    </div>,
    root
  );
};

Modal.propTypes = {
  // src: PropTypes.string.isRequired,
  // alt: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
