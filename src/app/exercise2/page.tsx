"use client";
import { Range } from "../components";
import useRangesValues from "@/hooks/useRangesValues";

const ExerciseTwo: React.FC = () => {
	const { data, isLoading, error } = useRangesValues();
	const exerciseTwoValues = data?.exerciseTwo;

	const handleRangeChange = (valueMin: number, valueMax: number) => {
		console.log(valueMax, "MAX VALUE");
		console.log(valueMin, "MIN VALUE");
		return;
	};

	return (
		<div>
			<h1 className="my-4 font-bold">Exercise 2</h1>
			{error && <h1 className="text-red-600 font-bold">Network error</h1>}
			{!isLoading && !error && <Range fixedValues={exerciseTwoValues} onChange={handleRangeChange} />}
		</div>
	);
};

export default ExerciseTwo;
