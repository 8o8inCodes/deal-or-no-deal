import React, { useEffect } from "react";
import s from "./OpenCrateAnimation.module.css";
const OpenCrateAnimation = ({ crate, onAnimationFinish, onClose }) => {
	useEffect(() => {
		onAnimationFinish();
	}, []);
	return (
		<div className={s.backdrop}>
			<div className={s.modal}>
				<h1>${crate.money}</h1>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default OpenCrateAnimation;
