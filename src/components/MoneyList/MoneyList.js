import React from "react";
import s from "./MoneyList.module.css";

const MoneyList = ({ moneyList }) => {
	return (
		<div className={s.container}>
			{moneyList.map((money) => {
				return (
					<button key={money.money} className={s.item}>
						{money.money}
					</button>
				);
			})}
		</div>
	);
};

export default MoneyList;
