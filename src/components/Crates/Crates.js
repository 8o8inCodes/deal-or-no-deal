import React from "react";
import s from "./Crates.module.css";

const Crates = ({ crates, onCrateSelect }) => {
	return (
		<div className={s.container}>
			{crates.map((crate, index) => {
				let className = s.crate;
				if (crate.isOpen) {
					className += " " + s.crateOpen;
				}
				return (
					<button
						onClick={() => onCrateSelect(crate)}
						key={index}
						className={className}
					>
						{crate.isOpen ? `$${crate.money}` : index + 1}
					</button>
				);
			})}
		</div>
	);
};

export default Crates;
