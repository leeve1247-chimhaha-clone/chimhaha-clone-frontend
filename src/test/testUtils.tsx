import { type ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { vi } from "vitest";
import { useAuth, type AuthContextProps } from "react-oidc-context";

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

interface RenderWithRouterOptions extends TestWrapperOptions {
  routes: RouteObject[];
  initialEntries?: string[];
}

function fillOutletDefaults(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => {
    const hasChildren = route.children && route.children.length > 0;
    return {
      ...route,
      element: route.element ?? (hasChildren ? <Outlet /> : route.element),
      children: hasChildren ? fillOutletDefaults(route.children!) : route.children,
    } as RouteObject;
  });
}

export function renderWithRouter(
  {
    routes,
    initialEntries,
    store = makeTestStore(),
    queryClient = makeTestQueryClient(),
    ...renderOptions
  }: RenderWithRouterOptions & Omit<RenderOptions, "wrapper">,
) {
  const router = createMemoryRouter(fillOutletDefaults(routes), { initialEntries });
  const result = renderWithProviders(<RouterProvider router={router} />, {
    store,
    queryClient,
    ...renderOptions,
  });
  return { ...result, router };
}

export function mockUseAuth(value: Partial<AuthContextProps> = {}): AuthContextProps {
  const defaults = {
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    settings: {},
    events: {},
    signinRedirect: vi.fn(),
    signoutRedirect: vi.fn(),
    removeUser: vi.fn(),
    clearStaleState: vi.fn(),
  } as unknown as AuthContextProps;
  const merged = { ...defaults, ...value } as AuthContextProps;
  vi.mocked(useAuth).mockReturnValue(merged);
  return merged;
}
