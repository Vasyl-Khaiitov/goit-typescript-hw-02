import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { CSSProperties, JSX } from 'react';

Modal.setAppElement('#root');

interface ModalStyles {
  content: CSSProperties;
}

const customStyles: ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type ImageModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  modalSrc: string;
  modalDesc: string;
};

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalSrc,
  modalDesc,
}: ImageModalProps): JSX.Element {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={css.Modal}
        overlayClassName={css.Overlay}
      >
        <img
          className={css.image_modal}
          src={modalSrc}
          alt={modalDesc}
          onClick={closeModal}
        />
      </Modal>
    </div>
  );
}
