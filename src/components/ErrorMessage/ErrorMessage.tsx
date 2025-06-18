interface ErrorMessageProps {
  isError: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ isError }) => {
  if (!isError) {
    return null;
  }

  return (
    <div>
      <strong>
        Oops, there is an internet problem, try reloading the page.
      </strong>
    </div>
  );
};

export default ErrorMessage;
