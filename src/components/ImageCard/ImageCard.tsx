import { JSX } from 'react';
import css from './ImageCard.module.css';

type ImageCardProps = {
  altDescrp: string;
  smallPhoto: string;
  largePhoto: string;
  openModal: (photo: string, description: string) => void;
};

export default function ImageCard({
  altDescrp,
  smallPhoto,
  largePhoto,
  openModal,
}: ImageCardProps): JSX.Element {
  return (
    <div onClick={() => openModal(largePhoto, altDescrp)}>
      <img className={css.image} src={smallPhoto} alt={altDescrp} />
    </div>
  );
}
