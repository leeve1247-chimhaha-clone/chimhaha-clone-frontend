import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { AuthProvider } from "react-oidc-context";
import {CData} from "./credential/data.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      authority={CData.authority}
      client_id={CData.client_id}
      redirect_uri={CData.redirect_uri}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
