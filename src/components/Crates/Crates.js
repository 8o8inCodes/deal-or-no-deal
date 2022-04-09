import React from "react";
import s from "./Crates.module.css";

const Crates = ({ crates, onCrateSelect }) => {
	return (
		<div className={s.container}>
			{crates.map((crate, index) => {
				return (
					<div key={index} className={s.crate}>
						{index + 1}
					</div>
				);
			})}
		</div>
	);
};

export default Crates;
