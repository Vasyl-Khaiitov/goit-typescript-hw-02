import { JSX } from 'react';

type MessageProps = {
  message: string;
};

export default function Message({ message }: MessageProps): JSX.Element {
  return (
    <div>
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
}
