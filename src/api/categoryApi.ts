import axios from "axios";
import { CData } from "../../credential/data.ts";
import type { RawRouteConfig } from "../router/convertToRouteObjects.tsx";
import type { routerDataTree } from "../components/header/main/nav/HeaderNav.tsx";

export const categoryApi = {
  fetchRouterDataFlat(): Promise<RawRouteConfig[]> {
    return axios
      .get<RawRouteConfig[]>(CData.local_backend + "/post-categories/flat")
      .then((res) => res.data);
  },

  fetchRouterDataTree(): Promise<routerDataTree[] | undefined> {
    return axios
      .get<routerDataTree[]>(CData.local_backend + "/post-categories")
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        return undefined;
      });
  },
};
