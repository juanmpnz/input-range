'use client'
import React from "react";
import { Range } from "../components";

export const ExerciseTwo = () => {

	const handleRangeChange = (valueMin: number, valueMax: number ) => {
		console.log(valueMax, 'MAX VALUE')
		console.log(valueMin, 'MIN VALUE')
		return;
   };

	return (
		<div>
			<h1 className="my-4 font-bold">Exercise 2</h1>
			<Range fixedValues={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} onChange={handleRangeChange}/>
		</div>
	);
};

export default ExerciseTwo;
