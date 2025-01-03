"use client";
import React from "react";
import { Range } from "../components";

export const ExerciseOne = () => {

	const handleRangeChange = (valueMin: number, valueMax: number) => {
		console.log(valueMax, "MAX VALUE");
		console.log(valueMin, "MIN VALUE");
		return;
	};

	return (
		<div>
			<h1 className="my-4 font-bold">Exercise 1</h1>
			<Range onChange={handleRangeChange} />
		</div>
	);
};

export default ExerciseOne;
