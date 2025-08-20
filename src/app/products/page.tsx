"use client";

import {
  searchProducts,
  fetchProducts,
  ProductProps,
} from "@api/products/productsList";
import MainCard from "@components/common/card-component/MainCard";
import { useEffect, useState, useRef } from "react";
import IconButton from "@components/ui/IconButton";
import { useDebounce } from "@hooks/useDebounce";
import Input from "@components/ui/input/Input";
import { Loader2, Search } from "lucide-react";
import { URLS } from "@constants/urls";
import Link from "next/link";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<ProductProps[]>([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);
  const debouncedQuery = useDebounce({ value: query, delay: 500 });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsInitialLoading(true);
      const res = await fetchProducts(1);
      if (res) {
        setDisplayedItems(res.results);
        setTotalItemsCount(res.count);
      }
      setIsInitialLoading(false);
    })();
  }, []);

  // 검색 처리
  useEffect(() => {
    if (debouncedQuery) {
      (async () => {
        setIsInitialLoading(true);
        const results = await searchProducts(debouncedQuery);
        setSearchResults(results);
        setIsInitialLoading(false);
      })();
    } else {
      (async () => {
        setPage(1);
        setHasMore(true);
        const data = await fetchProducts(1);
        setDisplayedItems(data.results);
        setSearchResults([]);
      })();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef || debouncedQuery) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);
          const nextPage = page + 1;
          const data = await fetchProducts(nextPage);
          if (data.results.length === 0) {
            setHasMore(false);
          } else {
            setDisplayedItems((prev) => {
              const existingIds = new Set(prev.map((item) => item.id));
              const uniqueNewItems = data.results.filter(
                (item) => !existingIds.has(item.id),
              );
              return [...prev, ...uniqueNewItems];
            });
            setPage(nextPage);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isLoading, hasMore, page, debouncedQuery]);

  const finalItems = debouncedQuery ? searchResults : displayedItems;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="mx-auto max-w-[1024px] pt-20 pb-40">
      <div className="flex justify-between pb-8">
        <p className="text-subtitle-2 text-text-primary">
          전체상품({totalItemsCount})
        </p>
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Input
              className="h-[34px] w-60 p-2 pl-10 focus:placeholder-transparent"
              onChange={handleInputChange}
              placeholder="search"
              type="search"
              value={query}
            />
            <IconButton
              className="absolute left-2 text-text-disabled"
              aria-label="검색아이콘"
              As={Search}
            />
          </div>
          <div className="px-4 py-1">최신순</div>
          <div className="px-4 py-1">필터</div>
        </div>
      </div>

      {isInitialLoading && (
        <div className="py-20 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin" />
          <p>상품을 불러오는 중...</p>
        </div>
      )}

      {!isInitialLoading && finalItems.length === 0 && (
        <div className="text-subtitle-1 py-15 text-center">
          {debouncedQuery
            ? "검색 결과가 없습니다."
            : "상품이 존재하지 않습니다."}
        </div>
      )}

      {!isInitialLoading && finalItems.length > 0 && (
        <div className="grid grid-cols-4 gap-x-2 gap-y-8">
          {finalItems.map((item) => (
            <Link
              href={`${URLS.PRODUCTS}${URLS.DETAIL}/${item.id}`}
              key={item.id}
            >
              <MainCard item={item} />
            </Link>
          ))}
          {isLoading && (
            <div className="col-span-4 flex justify-center">
              <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
              <span className="text-muted-foreground ml-2">
                더 많은 상품을 불러오는 중...
              </span>
            </div>
          )}
        </div>
      )}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default ProductPage;
