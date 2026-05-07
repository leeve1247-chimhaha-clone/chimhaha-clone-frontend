import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-oidc-context");

import { PostSubmitDeleteButton } from "./PostSubmitDeleteButton.tsx";
import { mockUseAuth, renderWithRouter } from "../../../test/testUtils.tsx";
import { mswServer, http, HttpResponse } from "../../../test/mswServer.ts";
import { CData } from "../../../../credential/data.ts";

const BACKEND = CData.local_backend;

function renderButton() {
  mockUseAuth({ isAuthenticated: true, user: { access_token: "tok" } as never });
  return renderWithRouter({
    initialEntries: ["/free/42"],
    routes: [
      {
        path: "/",
        children: [
          {
            path: ":category",
            children: [{ path: ":postId", element: <PostSubmitDeleteButton /> }],
          },
        ],
      },
    ],
  });
}

describe("PostSubmitDeleteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a centered confirm dialog instead of deleting immediately", async () => {
    let deleteCalled = false;
    mswServer.use(
      http.post(`${BACKEND}/delete`, () => {
        deleteCalled = true;
        return HttpResponse.json(1);
      }),
    );

    renderButton();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "삭제" }));

    expect(screen.getByText("게시글 삭제")).toBeInTheDocument();
    expect(deleteCalled).toBe(false);
  });

  it("cancels the deletion when the cancel button is clicked", async () => {
    let deleteCalled = false;
    mswServer.use(
      http.post(`${BACKEND}/delete`, () => {
        deleteCalled = true;
        return HttpResponse.json(1);
      }),
    );

    renderButton();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "삭제" }));
    await user.click(screen.getByRole("button", { name: "취소" }));

    expect(screen.queryByText("게시글 삭제")).not.toBeInTheDocument();
    expect(deleteCalled).toBe(false);
  });

  it("calls the delete API and navigates back to the category list when confirmed", async () => {
    let receivedBody: unknown = null;
    mswServer.use(
      http.post(`${BACKEND}/delete`, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json(1);
      }),
    );

    const { router } = renderButton();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "삭제" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "삭제" }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/free");
    });
    expect(receivedBody).toEqual({ postId: "42" });
  });
});
