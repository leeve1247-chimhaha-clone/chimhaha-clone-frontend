import * as React from "react";

export const LazyImageComponent = React.lazy(
    () => import("./ImageComponent.tsx")
);