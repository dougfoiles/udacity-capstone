import { useEffect, useRef, useState, useCallback } from "react";
import useInView from "react-cool-inview";

const useInfiniteScroll = (props) => {
  const { getItems, options = {} } = props;
  const { loadingType, partialInfiniteLimit = -1 } = options;
  const [items, setItems] = useState([]);

  const allPagesLoaded = useRef(false);
  const currentPage = useRef(1);
  const initialPageLoaded = useRef(false);
  const [hasNext, setHasNext] = useState(true);

  const isInFlight = useRef(false);
  const triggerNext = useRef(false);
  const remainingPagesToAutoload = useRef(
    loadingType === "manual" ? 0 : partialInfiniteLimit
  );

  const loadItems = useCallback(
    async (page) => {
      let items;

      isInFlight.current = true;
      const data = await getItems({ page });
      isInFlight.current = false;
      items = data.items;

      // Handle loading the last page directly
      if (data.totalPages <= page) {
        setHasNext(false);
        allPagesLoaded.current = true;
      }

      setItems((prevItems) => {
        return [...prevItems, ...items];
      });
    },
    [getItems]
  );

  const loadNext = () => {
    const nextPage = currentPage.current + 1;
    loadItems(nextPage, "append");
    currentPage.current = nextPage;
  };

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(currentPage.current, "append");
    initialPageLoaded.current = true;
  }, [loadItems]);

  const { observe, unobserve } = useInView({
    onEnter: () => {
      if (remainingPagesToAutoload.current === 0) {
        unobserve();
        return;
      }

      remainingPagesToAutoload.current = remainingPagesToAutoload.current - 1;
      if (isInFlight.current) {
        triggerNext.current = true;
      } else {
        loadNext();
      }
    },
  });

  return {
    items,
    hasNext,
    loadNext,
    loadMoreRef: observe,
  };
};

export { useInfiniteScroll };
