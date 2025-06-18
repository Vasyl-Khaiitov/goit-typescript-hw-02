export interface PhotoCollection {
  id: number;
  user: {
    name: string;
  };
  description: null;
  likes: number;
  urls: {
    regular: string;
    small: string;
  };
}

export type HandleSearchProps = {
  newTopic: string;
};
