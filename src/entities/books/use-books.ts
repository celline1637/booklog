import { booksApi } from "@/entities/books/api";
import { QUERY_KEY } from "@/entities/reviews/key";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const queryKey = QUERY_KEY.list();
const queryFn = booksApi.getBooks;

// ----------------------------------------------------------------------

export function getBooksQueryOptions() {
  return queryOptions({
    queryKey: queryKey,
    queryFn: queryFn,
  });
}

// ----------------------------------------------------------------------

export const useBooks = () => {
  const query = useSuspenseQuery({
    ...getBooksQueryOptions(),
  });

  return query;
};
