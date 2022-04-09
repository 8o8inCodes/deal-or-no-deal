import React from "react";
import s from "./MoneyList.module.css";

const MoneyList = ({ moneyList }) => {
	return (
		<div className={s.container}>
			{moneyList.map((crate) => {
				let className = s.item;
				if (crate.isOpen) {
					className += " " + s.crateOpen;
				}
				return (
					<button key={crate.money} className={className}>
						{crate.money}
					</button>
				);
			})}
		</div>
	);
};

export default MoneyList;
