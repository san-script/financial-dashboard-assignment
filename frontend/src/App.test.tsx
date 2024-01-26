import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
	it("renders App component correctly", () => {
		render(<App />);

		// You can add more specific assertions based on your component's structure
		expect(
			screen.getByText("Financial Portfolio Dashboard")
		).toBeInTheDocument();
		// Adjust the text based on your actual rendering content

		// Example: expect(screen.getByTestId('some-element')).toBeInTheDocument();
	});

	// Add more tests as needed for specific behavior in your App component
});
