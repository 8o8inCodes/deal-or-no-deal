import "./App.css";
import { useState, useEffect } from "react";

import MoneyList from "./components/MoneyList/MoneyList";
import Crates from "./components/Crates/Crates";
import OpenCrateAnimation from "./components/OpenCrateAnimation/OpenCrateAnimation";

const crates = [
	0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000,
	25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000,
];

const AMOUNT_OF_CASES_TO_PICK = 6;

const WIN_STATES = {
	OFFER_ACCEPTED: 1,
	FINAL_CRATE_OPENED: 2,
};

function App() {
	const [cratesState, setCratesState] = useState([]);
	const [shuffledCrates, setShuffledCrates] = useState([]);

	const [caseAmountToPick, setCaseAmountToPick] = useState(
		AMOUNT_OF_CASES_TO_PICK
	);
	const [currentCaseAmount, setCurrentCaseAmount] = useState(
		AMOUNT_OF_CASES_TO_PICK
	);

	const [bankerMode, setBankerMode] = useState(false);
	const [bankerOffer, setBankerOffer] = useState(0);

	const [winState, setWinState] = useState(0);
	const [moneyWon, setMoneyWon] = useState(0);

	const [selectedCrate, setSelectedCrate] = useState();
	const [openCrateMode, setOpenCrateMode] = useState(false);

	const handleAccept = () => {
		setMoneyWon(bankerOffer);
		setWinState(WIN_STATES.OFFER_ACCEPTED);
	};

	const handleCrateOpenFinish = () => {
		const newCratesState = cratesState.map((crate) => {
			if (crate.money === selectedCrate.money) {
				return {
					...crate,
					isOpen: true,
				};
			}
			return crate;
		});
		const newShuffledCrates = shuffledCrates.map((crate) => {
			if (crate.money === selectedCrate.money) {
				return {
					...crate,
					isOpen: true,
				};
			}
			return crate;
		});
		setShuffledCrates(newShuffledCrates);
		setCratesState(newCratesState);
	};

	const handleReject = () => {
		const newCaseAmount = caseAmountToPick - 1;
		setCaseAmountToPick(newCaseAmount);
		setCurrentCaseAmount(newCaseAmount);
		setBankerMode(false);
		setBankerOffer(0);
	};

	const handleCrateSelect = (crate) => {
		setSelectedCrate(crate);
		setOpenCrateMode(true);
	};

	const shuffle = (array) => {
		const newArray = [...array];
		let currentIndex = newArray.length,
			temporaryValue,
			randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = newArray[currentIndex];
			newArray[currentIndex] = newArray[randomIndex];
			newArray[randomIndex] = temporaryValue;
		}
		return newArray;
	};

	useEffect(() => {
		const newCrateState = [];
		crates.forEach((money) => {
			newCrateState.push({
				money,
				open: false,
			});
		});
		setCratesState(newCrateState);
		setShuffledCrates(shuffle(newCrateState));
	}, []);
	return (
		<div className="App">
			<div className="gameContainer">
				<MoneyList
					moneyList={cratesState.slice(0, Math.floor(cratesState.length / 2))}
				></MoneyList>
				<div>
					<h1>Amount of cases to pick {currentCaseAmount}</h1>
					<Crates
						crates={shuffledCrates}
						onCrateSelect={handleCrateSelect}
					></Crates>
				</div>
				<MoneyList
					moneyList={cratesState.slice(
						Math.floor(cratesState.length / 2),
						cratesState.length
					)}
				></MoneyList>
			</div>

			{/* {bankerMode && (
				<BankerPopup
					bankerOffer={bankerOffer}
					onAccept={handleAccept}
					onReject={handleReject}
				></BankerPopup>
			)}*/}
			{openCrateMode && (
				<OpenCrateAnimation
					crate={selectedCrate}
					onAnimationFinish={handleCrateOpenFinish}
					onClose={() => setOpenCrateMode(false)}
				></OpenCrateAnimation>
			)}
		</div>
	);
}

export default App;
