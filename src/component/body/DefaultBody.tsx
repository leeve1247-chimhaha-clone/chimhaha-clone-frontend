import { useLocation, useNavigate } from "react-router-dom";

export function DefaultBody() {
  const navigate = useNavigate();
  const category = useLocation();
  return (
    <>
      <div> Unknown component: {category.pathname}</div>
      <button
        onClick={() => {
          navigate("submit");
        }}
      >
        Submit
      </button>
    </>
  );
}
