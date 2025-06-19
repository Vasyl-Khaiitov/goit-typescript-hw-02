import { useEffect, useState, useRef, useCallback } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchArticlesWithTopic } from '../../Serwis-api/Serwis-api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import { PhotoCollection } from './App.types';

export default function App() {
  const [photoCollections, setPhotoCollections] = useState<PhotoCollection[]>(
    [],
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalDesc, setModalDesc] = useState<string>('');

  const itemRefs = useRef<HTMLElement[]>([]);

  const handleSearch = async (newTopic: string): Promise<void> => {
    setTopic(newTopic);
    setCurrentPage(1);
    setPhotoCollections([]);
    setMessage(null);
  };

  const scrollToElement = useCallback((): void => {
    setTimeout(() => {
      if (!itemRefs.current.length || currentPage >= totalPages) return;

      const firstNewIndex = itemRefs.current.length - 2;
      const targetElement = itemRefs.current[firstNewIndex];

      if (!targetElement) return;

      const elementHeight = targetElement.clientHeight;
      window.scrollBy({ top: 2 * elementHeight, behavior: 'smooth' });
    }, 1500);
  }, [currentPage, totalPages]);

  const incrementPage = (): void => {
    setLoading(true);
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (topic === '') {
      return;
    }

    async function fetchData(): Promise<void> {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchArticlesWithTopic(topic, currentPage);
        const typeData = data as {
          total?: number;
          total_pages: number;
          results: PhotoCollection[];
        };

        setPhotoCollections((prevPhotoCollections) => [
          ...prevPhotoCollections,
          ...typeData.results,
        ]);
        setTotalPages(typeData.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [topic, currentPage]);

  useEffect(() => {
    if (currentPage > 1 && currentPage < totalPages) {
      scrollToElement();
    }
  }, [currentPage, totalPages, scrollToElement]);

  function openModal(imageSrc: string, imageAlt: string) {
    setModalSrc(imageSrc);
    setModalDesc(imageAlt);
    setModalIsOpen(true);
  }

  function closeModal(): void {
    setModalIsOpen(false);
  }

  useEffect(() => {
    itemRefs.current = [];
  }, [photoCollections]);

  const valueTopic = topic.trim() !== '';
  const collectionsLength = photoCollections.length > 0;
  const lastPage = currentPage < totalPages;

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage isError={isError} />}
      {!isLoading &&
        !isError &&
        valueTopic &&
        photoCollections.length === 0 && (
          <Message>{message ?? 'No results found for your query.'}</Message>
        )}
      {collectionsLength && (
        <ImageGallery
          items={photoCollections}
          openModal={openModal}
          itemRefs={itemRefs}
        />
      )}
      {isLoading && currentPage > 1 && <Loader />}
      {collectionsLength && !isLoading && lastPage && (
        <LoadMoreBtn incrPage={incrementPage} />
      )}
      {collectionsLength && currentPage === totalPages && (
        <strong>
          Thanks for watching, you have reached the end of the collection.
        </strong>
      )}
      {modalIsOpen && modalSrc && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          modalDesc={modalDesc}
          modalSrc={modalSrc}
        />
      )}
    </div>
  );
}
