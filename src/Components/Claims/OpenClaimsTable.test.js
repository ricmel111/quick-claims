import { render, act, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OpenClaimsTable from "./OpenClaimsTable";
import { Provider } from "react-redux";
import store from "../../store/store";

jest.mock("../../Data/DataFunctions", () => {
    return {
      getAllOpenClaims: () => {
        return Promise.resolve({
          status: 200,
          data: [
            1,
            "O",
            "1234",
            "Property",
            "123 Main Street, Chicago, IL, 20982",
            "",
            "",
            "",
            "",
            "",
            "Phil",
            "Foden",
            new Date().toISOString(),
            123.45,
            "Fire damage",
            "a long description",
            new Date().toISOString(),
            "further details here",
            null,
            [2, "O", "this is task 1", new Date().toISOString()],
            [2, "this is note 1", new Date().toISOString()]
          ]
        });
      }
    };
  });

  test("open claims table is displayed on page load", async () => {
    const { findByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <OpenClaimsTable />
        </Provider>
      </BrowserRouter>
    );


    await act(async () => {
    const openClaims = await screen.findByTestId("table");
    expect(openClaims).toBeInTheDocument();
  });

  });