import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages";

test("ログインボタンの存在", async () => {
  render(<Home />);

  expect(screen.getByText("LOGIN")).toBeTruthy();
});
