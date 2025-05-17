import cssClass from "./HeaderNav.module.css";
import { setHeaderDropDownStatus } from "../../redux/dropDown/dropDownSlice.tsx";
import { useDispatch } from "react-redux";
import { HeaderLevelZero } from "./refactor/HeaderLevelZero.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CData } from "../../../credential/data.ts";

async function myFunction() {
  return axios.get(CData.local_backend + "/post-categories")
    .then(
      (response) => {
        console.log("Data fetched successfully:", response.data);
        return JSON.stringify(response.data);
      }
    )
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

export function HeaderNav() {
  const dispatch = useDispatch();
  const {data, error, isLoading, isError} = useQuery({queryKey: ['hello'], queryFn: myFunction});
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
          <HeaderLevelZero />
        </div>
      </div>
    </>
  );
}
