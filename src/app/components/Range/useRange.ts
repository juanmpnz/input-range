import { useState } from "react";

const useRange = (fixedValues: number[] = []) => {
	const [values, setValues] = useState(() =>
		fixedValues.length > 0 ? [fixedValues[0], fixedValues[fixedValues.length - 1]] : [0, 100]
	);
	const [editing, setEditing] = useState<number | null>(null);

	const maxValue = fixedValues.length > 0 ? Math.max(...fixedValues) : 100;
	const minValue = fixedValues.length > 0 ? Math.min(...fixedValues) : 0;

	const handleMove = (e: MouseEvent, index: number, rect: DOMRect) => {
		const offsetX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
		let newValue = Math.round((offsetX / rect.width) * maxValue);

		if (fixedValues.length > 0) {
			newValue = fixedValues.reduce((closest, current) =>
				Math.abs(current - newValue) < Math.abs(closest - newValue) ? current : closest
			);
		}

		setValues((prev) => {
			const updated = [...prev];
			updated[index] = Math.max(
				index === 1 ? prev[0] : minValue,
				Math.min(index === 0 ? prev[1] : maxValue, newValue)
			);
			return updated;
		});
	};

	const startDrag = (e: React.MouseEvent, index: number) => {
		const slider = (e.currentTarget.parentElement as HTMLDivElement).getBoundingClientRect();
		const move = (ev: MouseEvent) => handleMove(ev, index, slider);
		const stop = () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseup", stop);
		};
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", stop);
	};

	const handleEdit = (index: number, value: number) => {
		let newValue = value;

		if (fixedValues.length > 0) {
			newValue = fixedValues.reduce((closest, current) =>
				Math.abs(current - value) < Math.abs(closest - value) ? current : closest
			);
		}

		setValues((prev) => {
			const updated = [...prev];
			updated[index] = Math.max(
				index === 1 ? prev[0] : minValue,
				Math.min(index === 0 ? prev[1] : maxValue, newValue)
			);
			return updated;
		});
	};

	return {
		startDrag,
		handleMove,
		handleEdit,
		setEditing,
		values,
		maxValue,
		minValue,
		editing,
	};
};

export default useRange;
