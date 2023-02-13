import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("menu contains a link to the new claim page", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const findLink = screen.getByText("New Claim");
  expect(findLink).toHaveAttribute("href", "/new-claim");
});

test("menu contains a link to the search page", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const findLink = screen.getByText("Search");
  expect(findLink).toHaveAttribute("href", "/search");
});

test("menu contains a link to the open claims page", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const findLink = screen.getByText("Open Claims");
  expect(findLink).toHaveAttribute("href", "/open-claims");
});
