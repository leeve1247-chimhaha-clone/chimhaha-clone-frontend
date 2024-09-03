import { ShouldRevalidateFunctionArgs, useRouteLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router-dom";

export function PostDetail() {
  const data = useRouteLoaderData("post-detail") as any;
  console.log(data);
  return (
    <>
      <h1>인기글</h1>
      <h1>디테일</h1>
      <h1>{data.postId}</h1>
    </>
  );
}

export async function postDetailLoader({ params }: LoaderFunctionArgs) {
  console.log(params)
  return params;
}

export function postDetailShouldRevalidate({ currentParams, nextParams }:  ShouldRevalidateFunctionArgs) {
  return currentParams.postId !== nextParams.postId;
}