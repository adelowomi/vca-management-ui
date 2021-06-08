import { ToastProvider, useToasts } from 'react-toast-notifications';

const FormWithToasts = () => {
  const { addToast } = useToasts();

  const onSubmit = async () => {
    // const { error } = await dataPersistenceLayer(value);
    const { error } = { error: { message: 'error while fetching data' } };

    if (error) {
      addToast(error.message, { appearance: 'error' });
    } else {
      addToast('Saved Successfully', { appearance: 'success' });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">clicker</button>
    </form>
  );
};

export const Toast = () => (
  <ToastProvider>
    <FormWithToasts />
  </ToastProvider>
);
