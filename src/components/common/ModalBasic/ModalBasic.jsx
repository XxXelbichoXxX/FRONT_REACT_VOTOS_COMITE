import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './ModalBasic.scss';

export const ModalBasic = ({ show, size, title, children, onClose }) => {
  return (
    <Modal isOpen={show} toggle={onClose} size={size} centered className="custom-modal" backdrop = "static"> 
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

ModalBasic.defaultProps = {
  size: 'md', // Tamaño puede ser 'sm', 'md', 'lg', etc.
  show: false,
  title: 'Modal',
};