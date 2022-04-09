import React, { useEffect, useState } from "react";
import s from "./BankerPopup.module.css";
const BankerPopup = ({ onAccept, onReject }) => {
	const [bankerOffer, setBankerOffer] = useState();

	return (
		<div className={s.backdrop}>
			<div className={s.modal}>
				<h1>Bank offers you:</h1>
				<label>
					$
					<input
						className={s.bankerOfferInput}
						type="text"
						value={bankerOffer}
						onChange={(e) => setBankerOffer(e.target.value)}
					></input>
				</label>
				<button onClick={() => onAccept(bankerOffer)}>Deal</button>
				<button onClick={onReject}>No deal!</button>
			</div>
		</div>
	);
};

export default BankerPopup;
