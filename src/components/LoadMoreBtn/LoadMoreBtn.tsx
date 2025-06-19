import { JSX } from 'react';
import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  incrPage: () => void;
};

export default function LoadMoreBtn({
  incrPage,
}: LoadMoreBtnProps): JSX.Element {
  return (
    <div className={css.btn_box}>
      <button className={css.btn_more} type="button" onClick={incrPage}>
        Load More
      </button>
    </div>
  );
}
