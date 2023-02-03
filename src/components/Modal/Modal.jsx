import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, LargeImage } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Натисеули Esc');
      this.props.closeModal();
    }
  };

  handleOverlayClick = e => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <LargeImage>{this.props.children}</LargeImage>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
