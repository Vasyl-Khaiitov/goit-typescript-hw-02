import axios from 'axios';
import { PhotoCollection } from '../components/App/App.types';

axios.defaults.baseURL = 'https://api.unsplash.com/';

interface UnsplashSearchResp {
  total: number;
  total_pages: number;
  results: PhotoCollection[];
}

export const fetchArticlesWithTopic = async (
  topic: string,
  currentPage: number,
): Promise<UnsplashSearchResp> => {
  const myApiKey = import.meta.env.VITE_API_KEY;

  const response = await axios.get<UnsplashSearchResp>('/search/photos', {
    params: {
      query: topic,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${myApiKey}`,
    },
  });
  return response.data;
};
