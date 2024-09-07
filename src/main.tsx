import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { AuthProvider } from "react-oidc-context";
import { CData } from "./credential/data.ts";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store.ts";
import { QuillSetup } from "./utils/QuillSetup.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuillSetup>
      <Provider store={store}>
        <AuthProvider
          authority={CData.authority}
          client_id={CData.client_id}
          redirect_uri={CData.redirect_uri}
          onSigninCallback={async (_user) => {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname,
            );
          }}
          automaticSilentRenew={true}
        >
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </QuillSetup>
  </React.StrictMode>,
);
