import axios from "axios";
import { CData } from "../../credential/data.ts";
import type { RawRouteConfig } from "../router/convertToRouteObjects.tsx";
import type { routerDataTree } from "../components/header/main/nav/HeaderNav.tsx";

export const categoryApi = {
  async fetchRouterDataFlat(): Promise<RawRouteConfig[]> {
    const res = await axios
      .get<RawRouteConfig[]>(CData.local_backend + "/post-categories/flat");
    return res.data;
  },

  async fetchRouterDataTree(): Promise<routerDataTree[] | undefined> {
    try {
      const res = await axios
        .get<routerDataTree[]>(CData.local_backend + "/post-categories");
      return res.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return undefined;
    }
  },
};
