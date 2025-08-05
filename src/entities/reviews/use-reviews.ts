import { reviewApi } from "@/entities/reviews/api";
import { QUERY_KEY } from "@/entities/reviews/key";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const queryKey = QUERY_KEY.list();
const queryFn = reviewApi.getReviews;

// ----------------------------------------------------------------------

export function getReviewsQueryOptions() {
  return queryOptions({
    queryKey: queryKey,
    queryFn: queryFn,
  });
}

// ----------------------------------------------------------------------

export const useReviews = () => {
  const query = useSuspenseQuery({
    ...getReviewsQueryOptions(),
  });

  return query;
};
