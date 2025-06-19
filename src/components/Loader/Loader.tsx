import { RiseLoader } from 'react-spinners';
import css from './Loader.module.css';
import { JSX } from 'react';

export default function Loader(): JSX.Element {
  return (
    <div className={css.loader_box}>
      <RiseLoader size={10} />
    </div>
  );
}
