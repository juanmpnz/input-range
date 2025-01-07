"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/utils/utils";

export const Navigation: React.FC = () => {
	const router = useRouter();
	return (
		<div className="flex flex-row gap-8 border-b pb-4">
			{menuItems.map((e, i) => (
				<button type="button" onClick={() => router.push(e.to)} key={e.text + i}>
					{e.text}
				</button>
			))}
		</div>
	);
};
