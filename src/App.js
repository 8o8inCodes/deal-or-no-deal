import "./App.css";
import { useState, useEffect } from "react";

import MoneyList from "./components/MoneyList/MoneyList";
import Crates from "./components/Crates/Crates";
import OpenCrateAnimation from "./components/OpenCrateAnimation/OpenCrateAnimation";
import BankerPopup from "./components/BankerPopup/BankerPopup";

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
	const [selectedInitialCrate, setSelectedInitialCrate] = useState(null);

	const [cratesState, setCratesState] = useState([]);
	const [shuffledCrates, setShuffledCrates] = useState([]);

	const [caseAmountToPick, setCaseAmountToPick] = useState(
		AMOUNT_OF_CASES_TO_PICK
	);
	const [currentCaseAmount, setCurrentCaseAmount] = useState(
		AMOUNT_OF_CASES_TO_PICK
	);

	const [bankerMode, setBankerMode] = useState(false);

	const [winState, setWinState] = useState(0);
	const [moneyWon, setMoneyWon] = useState(0);

	const [selectedCrate, setSelectedCrate] = useState();
	const [openCrateMode, setOpenCrateMode] = useState(false);

	const [finalCrates, setFinalCrates] = useState(null);

	const handleAccept = (offer) => {
		setBankerMode(false);
		setMoneyWon(offer);
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

		let closedCrates = cratesState.filter((crate) => !crate.isOpen);
		if (closedCrates.length === 3) {
			setFinalCrates([
				{
					...closedCrates[0],
					initial: false,
				},
				{
					...closedCrates[1],
					initial: false,
				},
			]);
		} else {
			updateCaseAmountToPick();
		}
	};
	const updateCaseAmountToPick = () => {
		setCurrentCaseAmount(currentCaseAmount - 1);
		if (currentCaseAmount <= 1) {
			setBankerMode(true);
		}
	};
	const handleReject = () => {
		let newCaseAmount = caseAmountToPick - 1;
		if (newCaseAmount <= 1) {
			newCaseAmount = 1;
		}
		setCaseAmountToPick(newCaseAmount);
		setCurrentCaseAmount(newCaseAmount);
		setBankerMode(false);
	};

	const handleCrateSelect = (crate) => {
		if (finalCrates) {
			setMoneyWon(crate.money);
			setWinState(WIN_STATES.FINAL_CRATE_OPENED);
			return;
		}
		if (selectedInitialCrate) {
			setSelectedCrate(crate);
			setOpenCrateMode(true);
		} else {
			const newCratesState = cratesState.map((_crate) => {
				if (_crate.money === crate.money) {
					return {
						...crate,
						initial: true,
					};
				}
				return _crate;
			});
			const newShuffledCrates = shuffledCrates.map((_crate) => {
				if (_crate.money === crate.money) {
					return {
						...crate,
						initial: true,
					};
				}
				return _crate;
			});
			setShuffledCrates(newShuffledCrates);
			setCratesState(newCratesState);
			setSelectedInitialCrate({ ...crate, initial: true });
		}
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
				isOpen: false,
				initial: false,
			});
		});
		setCratesState(newCrateState);
		setShuffledCrates(shuffle(newCrateState));
	}, []);

	const renderGame = () => {
		return (
			<>
				<div className="gameContainer">
					<MoneyList
						moneyList={cratesState.slice(0, Math.floor(cratesState.length / 2))}
					></MoneyList>
					<div>
						{selectedInitialCrate && (
							<h1>Amount of cases to pick {currentCaseAmount}</h1>
						)}
						{!selectedInitialCrate && <h1>Select your magic crate</h1>}

						<Crates
							crates={finalCrates || shuffledCrates}
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

				{bankerMode && (
					<BankerPopup
						onAccept={handleAccept}
						onReject={handleReject}
					></BankerPopup>
				)}
				{openCrateMode && (
					<OpenCrateAnimation
						crate={selectedCrate}
						onAnimationFinish={handleCrateOpenFinish}
						onClose={() => setOpenCrateMode(false)}
					></OpenCrateAnimation>
				)}
			</>
		);
	};

	const renderWin = (msg) => {
		return (
			<div className="winnerContainer">
				<div className="winnerMessage">
					<h1>{msg}</h1>
					<h2>${moneyWon}</h2>
				</div>
			</div>
		);
	};

	return (
		<div className="App">
			{winState === 0 && renderGame()}
			{winState === WIN_STATES.FINAL_CRATE_OPENED &&
				renderWin("You have won by opening the last crate")}
			{winState === WIN_STATES.OFFER_ACCEPTED &&
				renderWin("You have won by accepting banker's offer")}
		</div>
	);
}

export default App;
