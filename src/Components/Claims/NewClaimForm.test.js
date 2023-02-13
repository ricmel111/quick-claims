import { getByText, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewClaimForm from "./NewCLaimForm";

jest.mock("../../Data/DataFunctions", () => {
    return {
        addNewCLaim : (newClaim) => {}
    }
});


test("check that Policy Number input initially has no span" , () => {
    render(<BrowserRouter>
        <NewClaimForm />
    </BrowserRouter>);
    const policyNumberCheckSpan = screen.queryByText(/check/i);
    expect(policyNumberCheckSpan).toBeNull();

});

test("check that Submit button is intially disabled" , () => {
    render(<BrowserRouter>
        <NewClaimForm />
    </BrowserRouter>);
    const buttons = screen.getAllByRole("button");
    const submitButton = buttons.find( b => b.textContent === "Submit Claim" );
    expect(submitButton).toBeDisabled();

});

test ("check that the reset button is not enabled initially", () => {
    render(
        <BrowserRouter>
            <NewClaimForm />
        </BrowserRouter>);
    const buttons = screen.getAllByRole("button");
    const resetButton = buttons.find( b => b.textContent === "Reset" );
    expect(resetButton).toBeDisabled();
});