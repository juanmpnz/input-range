"use client";
import { FC, useEffect, useMemo } from "react";
import useRange from "./useRange";

interface RangeProps {
  fixedValues?: number[];
  onChange: (valueMin: number, valueMax: number) => void;
}

export const Range: FC<RangeProps> = ({ fixedValues = [], onChange }) => {
  const { values, maxValue, minValue, startDrag, handleEdit, setEditing, editing } = useRange(fixedValues);
  const isFixed = useMemo(() => !!fixedValues.length, [fixedValues]);

  useEffect(() => {
    onChange(values[0], values[1]);
  }, [values]);

  return (
    <>
      <div className="flex justify-between relative top-4 text-lg">
        {values.map((value, index) => (
          <div
            data-testid={`value-label-${index}`}
            className={`${!isFixed && "cursor-pointer"}`}
            onClick={() => !isFixed && setEditing(index)}
            key={index}
          >
            {editing === index ? (
              <input
                data-testid={`value-input-${index}`}
                className="max-w-10 appearance-none"
                type="number"
                min={index === 1 ? values[0] : minValue}
                max={index === 0 ? values[1] : maxValue}
                onChange={(e) => {
                  const updatedValue = Number(e.target.value);
                  handleEdit(index, updatedValue);
                }}
                onBlur={() => setEditing(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditing(null);
                  }
                }}
                autoFocus
              />
            ) : (
              <p>{value}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <div className="w-full mx-auto px-12">
          <div className="relative w-full h-1 bg-gray-500 rounded">
            <div
              className="absolute h-1 bg-black rounded"
              style={{
                left: `${((values[0] - minValue) / (maxValue - minValue)) * 100}%`,
                width: `${((values[1] - values[0]) / (maxValue - minValue)) * 100}%`,
              }}
            />
            {values.map((_, i) => (
              <div
                data-testid={`handle-${i}`}
                key={i}
                className="absolute w-3 h-3 bg-black rounded-full -top-1 -translate-x-1/2 cursor-pointer"
                style={{
                  left: `${((values[i] - minValue) / (maxValue - minValue)) * 100}%`,
                }}
                onMouseDown={(e) => startDrag(e, i)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};