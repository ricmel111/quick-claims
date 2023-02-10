import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewClaimForm from "./NewCLaimForm";

jest.mock("../../Data/DataFunctions", () => {
    return {
        addNewCLaim : (newClaim) => {}
    }
});


test("check that Policy Number input initially has no policyNumberError class applied to it" , () => {
    render(<BrowserRouter>
        <NewClaimForm />
    </BrowserRouter>);
    const input = screen.getByLabelText("Policy Number");
    expect(input).toHaveClass("policyNumberError");

});