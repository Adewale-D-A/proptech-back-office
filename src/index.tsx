import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
//import redux
import StoreProvider from "./stores/StoreProvider";

import "./index.css";
import Loader from "./pages/loader";

const AppRoute = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      {/* //wrap app with HelmetProvide for Meta Data integration */}
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <AppRoute />
        </Suspense>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
