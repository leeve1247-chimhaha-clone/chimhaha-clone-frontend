import cssClass from "./HeaderNav.module.css";
import { setHeaderDropDownStatus } from "../../redux/dropDown/dropDownSlice.tsx";
import { useDispatch } from "react-redux";
import { HeaderLevelZeroes } from "./refactor/HeaderLevelZeroes.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CData } from "../../../credential/data.ts";

async function myFunction() {
  return axios
    .get<TheRouterData[]>(CData.local_backend + "/post-categories")
    .then((response) => {
      // console.log("Data fetched successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export interface TheRouterData {
  id: number;
  level: number;
  key: string;
  korean: string;
  children: TheRouterData[];
  theRouterData?: TheRouterData;
}

export function HeaderNav() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery({ queryKey: ["hello"], queryFn: myFunction });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data === undefined) return <div>No data</div>;
  return (
    <>
      <div className={cssClass.navContainer}>
        <div className={cssClass.list}>
          <button
            onClick={() => {
              dispatch(setHeaderDropDownStatus(""));
            }}
          >
            인기글
          </button>
          <button
            onClick={() => {
              dispatch(setHeaderDropDownStatus(""));
            }}
          >
            전체글
          </button>
          <HeaderLevelZeroes theRouterDataList={data} />
        </div>
      </div>
    </>
  );
}
