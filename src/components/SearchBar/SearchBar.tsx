import { Formik, Form, Field, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (inputValue: string) => void;
}

interface FormValues {
  searchphoto: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    value: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    const inputValue = value.searchphoto;
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
    } else {
      toast.error('Enter a keyword to search for', {
        duration: 2500,
        position: 'top-right',
      });
    }
    helpers.resetForm();
  };

  return (
    <header className={css.container}>
      <Formik
        initialValues={{
          searchphoto: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <Field
            className={css.form_iput}
            type="text"
            name="searchphoto"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <button className={css.form_btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
}
