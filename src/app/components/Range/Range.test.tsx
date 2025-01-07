import { render, screen, fireEvent } from "@testing-library/react";
import { Range } from "./Range";

describe("Range Component default values", () => {
	it("Permite al usuario establecer nuevos valores a traves de inputs las etiquetas de mínimo y máximo", () => {
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

describe("Range Component with fixedValues", () => {
	const fixedValues = [10, 20, 30, 40, 50];

	it("No debería permitir seleccionar o editar valores cuando se proporciona fixedValues.", () => {
		const mockOnChange = jest.fn();
		render(<Range fixedValues={fixedValues} onChange={mockOnChange} />);
		fireEvent.click(screen.getByText("10"));

		expect(screen.queryByTestId("value-input-0")).not.toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("50")).toBeInTheDocument();
	});

	it("Debería llamar a onChange con los valores de fixedValues cuando se proporciona fixedValues.", () => {
		const mockOnChange = jest.fn();
		render(<Range fixedValues={fixedValues} onChange={mockOnChange} />);

		expect(mockOnChange).toHaveBeenCalledWith(10, 50);
	});

	it("No debería permitir arrastrar los controles a valores fuera de los valores de fixedValues.", () => {
		render(<Range fixedValues={fixedValues} onChange={jest.fn()} />);

		const handle = screen.getByTestId("handle-0");
		fireEvent.mouseDown(handle);
		fireEvent.mouseMove(handle, { clientX: 300 });
		fireEvent.mouseUp(handle);

		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("50")).toBeInTheDocument();
	});
});
