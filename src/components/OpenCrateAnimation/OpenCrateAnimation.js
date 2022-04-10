import React, { useEffect, useRef, useState } from "react";
import s from "./OpenCrateAnimation.module.css";
const OpenCrateAnimation = ({ crate, onAnimationFinish, onClose }) => {
	const animationRef = useRef(null);
	const [closeDisabled, setCloseDisabled] = useState(true);
	useEffect(() => {
		animationRef.current.addEventListener("animationend", animationEnded);
		// onAnimationFinish();
	}, []);

	const animationEnded = () => {
		setCloseDisabled(false);
		onAnimationFinish();
	};
	return (
		<div className={s.backdrop}>
			<div className={s.modal}>
				<div className={s.crateImage}>
					<h1 ref={animationRef}>${crate.money}</h1>
				</div>
				<button className={s.button} onClick={onClose} disabled={closeDisabled}>
					Close
				</button>
			</div>
		</div>
	);
};

export default OpenCrateAnimation;
