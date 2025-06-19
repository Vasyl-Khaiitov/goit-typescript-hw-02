export interface PhotoCollection {
  id: number;
  user: {
    name: string;
  };
  description: string;
  likes: number;
  urls: {
    regular: string;
    small: string;
  };
}

export type HandleSearchProps = {
  newTopic: string;
};
