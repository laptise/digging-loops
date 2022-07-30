import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages";

describe("描画処理", () => {
  render(<Home />);
  const loginButton = screen.getByText("LOGIN");
  test("ログインボタンの存在", async () => {
    expect(loginButton).toBeTruthy();
  });
});
