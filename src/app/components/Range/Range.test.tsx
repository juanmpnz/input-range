import { render, screen, fireEvent } from "@testing-library/react";
import { Range } from "./Range";

describe("Range Component", () => {
	test("Permite al usuario establecer nuevos valores a traves de inputs las etiquetas de mínimo y máximo", () => {
		const handleChange = jest.fn();
		render(<Range onChange={handleChange} />);

		const minLabel = screen.getByTestId("value-label-0");
		const maxLabel = screen.getByTestId("value-label-1");

		fireEvent.click(minLabel);
		const minInput = screen.getByTestId("value-input-0");
		fireEvent.change(minInput, { target: { value: "20" } });
		fireEvent.blur(minInput);

		fireEvent.click(maxLabel);
		const maxInput = screen.getByTestId("value-input-1");
		fireEvent.change(maxInput, { target: { value: "40" } });
		fireEvent.blur(maxInput);

		expect(handleChange).toHaveBeenCalledWith(20, 40);
	});
});
