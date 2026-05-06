import { type ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";

import { dropDownSlice } from "../redux/dropDown/dropDownSlice.tsx";
import { accountSlice } from "../redux/account/accountSlice.tsx";
import { defaultPostDetailSlice } from "../redux/post/detail/defaultPostDetailSlice.tsx";
import { submitPostSlice } from "../redux/post/submit/submitPostSlice.tsx";
import { commentRootComponentSlice } from "../redux/comment/commentRootComponentSlice.tsx";

export function makeTestStore() {
  return configureStore({
    reducer: {
      headerDropDownStatus: dropDownSlice.reducer,
      accountStatus: accountSlice.reducer,
      defaultPostDetailStatus: defaultPostDetailSlice.reducer,
      submitPostStatus: submitPostSlice.reducer,
      commentRootComponentStatus: commentRootComponentSlice.reducer,
    },
  });
}

export function makeTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity, staleTime: Infinity },
      mutations: { retry: false },
    },
  });
}

export type TestStore = ReturnType<typeof makeTestStore>;

interface TestWrapperOptions {
  store?: TestStore;
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: ReactNode,
  {
    store = makeTestStore(),
    queryClient = makeTestQueryClient(),
    ...renderOptions
  }: TestWrapperOptions & Omit<RenderOptions, "wrapper"> = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function setLocationSearch(search: string) {
  const url = new URL(window.location.href);
  url.search = search;
  window.history.replaceState({}, "", url.toString());
}
