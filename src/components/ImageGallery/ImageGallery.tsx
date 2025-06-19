import { JSX } from 'react';
import { PhotoCollection } from '../App/App.types';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type ImageGalleryProps = {
  items: PhotoCollection[];
  openModal: (photo: string, description: string) => void;
  itemRefs: React.RefObject<HTMLElement[]>;
};

export default function ImageGallery({
  items,
  openModal,
  itemRefs,
}: ImageGalleryProps): JSX.Element {
  return (
    <div className={css.list_box}>
      <ul className={css.list}>
        {items.map((item, index) => (
          <li
            className={css.list_items}
            key={item.id}
            ref={(el) => {
              if (el && itemRefs.current) {
                (itemRefs.current as HTMLElement[])[index] = el;
              }
            }}
          >
            <ImageCard
              openModal={openModal}
              altDescrp={item.description}
              smallPhoto={item.urls.small}
              largePhoto={item.urls.regular}
            />
            <div className={css.descr_box}>
              <p>
                <b>Name:</b> {item.user.name}
              </p>
              <p>
                <b>Likes:</b> {item.likes}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
