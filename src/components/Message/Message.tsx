import { JSX } from 'react';

type MessageProps = {
  children: React.ReactNode;
};

export default function Message({ children }: MessageProps): JSX.Element {
  return (
    <div>
      <p>
        <strong>{children}</strong>
      </p>
    </div>
  );
}
