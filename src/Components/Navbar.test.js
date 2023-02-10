import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("menu contains a link to the find page", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const findLink = screen.getByText("New Claim");
  expect(findLink).toHaveAttribute("href", "/new-claim");
});
