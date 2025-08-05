import { logGroup } from "@/shared/utils/log";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useMemo } from "react";

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

const queryCache = new QueryCache({
  onError: (error, query) => {
    if (isAxiosError(error)) {
      const url = error.response?.config?.url;
      logGroup.error(`onError : ${url ?? "unknown URL"}`, () => {
        const _req = query.meta?.req;
        if (error.response?.data) {
          console.table(error.response.data);
        }
        if (_req) {
          console.table(_req);
        }
        console.error(error);
      });
    } else {
      console.error("Query Error (non-Axios):", error);
    }
  },
  onSuccess: (data, query) => {
    logGroup.success(
      `onSuccess : ${query.meta?.api ?? query.queryHash}`,
      () => {
        const _req = query.meta?.req;
        if (_req) {
          console.table(_req);
        }
        console.log(data);
      }
    );
  },
});

const defaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1분
    retry: 0,
  },
};

// ----------------------------------------------------------------------

export default function BaseQueryClientProvider({ children }: Props) {
  const mutationCache = useMemo(
    () =>
      new MutationCache({
        onError: (error) => {
          if (isAxiosError(error)) {
            const url = error.response?.config?.url;
            logGroup.error(`onError : ${url ?? "unknown URL"}`, () => {
              if (error.response?.data) {
                console.table(error.response.data);
              }

              if (error.config?.data) {
                try {
                  console.table(JSON.parse(error.config.data));
                } catch {
                  console.warn("Invalid JSON in config.data");
                }
              }

              console.error(error);
            });

            // 안전한 타입 캐스팅
            const responseData = error.response?.data as
              | { message: string; status: number }
              | undefined;

            if (responseData) {
              const { message, status } = responseData;
              console.warn(
                `API Error - Status: ${status}, Message: ${message}`
              );
            }
          } else {
            console.error("Mutation Error (non-Axios):", error);
          }
        },
        onSuccess: (data) => {
          logGroup.success(`onSuccess`, () => {
            console.log(data);
          });
        },
      }),
    []
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions,
        mutationCache,
        queryCache,
      }),
    [mutationCache]
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
