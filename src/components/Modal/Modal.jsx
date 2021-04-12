import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDown);
  }

  hendleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <img className={styles.oodal} src={this.props.largeImage} alt="" />
      </div>,
      modalRoot
    );
  }
}
Modal.protoTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Modal;
