import styles from './App.module.css';
import { useState } from 'react';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ['+', '-', '=', 'C'];

export const App = () => {
	const [entered, setEntered] = useState(0);
	const [answer, setAnswer] = useState(false);

	const checkExpression = (inputValue, currentValue) => {
		if (currentValue === 0) {
			if (Number(inputValue) === 0) {
				setEntered(currentValue);
			} else if (isNaN(inputValue)) {
				setEntered(currentValue + inputValue);
			} else {
				setEntered(inputValue);
			}
		} else if (Number(inputValue) === 0 && isNaN(String(currentValue).at(-1))) {
			setEntered(currentValue);
		} else if (isNaN(currentValue) && isNaN(inputValue)) {
			setEntered(currentValue);
		} else {
			setEntered(currentValue + inputValue);
		}
	};

	const onClick = (e) => {
		const { target } = e;
		const btnCalc = target.closest(`.${styles.calcBtn}`);
		if (btnCalc) {
			setAnswer(false);
			switch (btnCalc.textContent) {
				case '=':
					const result = new Function(`return ${entered}`);
					setAnswer(true);
					setEntered(result);
					break;
				case 'C':
					setEntered(0);
					break;
				default:
					checkExpression(btnCalc.textContent, entered);
					break;
			}
		}
	};

	return (
		<div className={styles.calc}>
			<div className={styles.calcDisplay}>
				<span
					className={
						answer ? styles.calcDisplayColor : styles.calcDisplayNotColor
					}
				>
					{entered}
				</span>
			</div>
			<div className={styles.calcPanel} onClick={onClick}>
				<div className={styles.calcPanelNumbers}>
					{numbers.map((number) => (
						<span key={number} className={styles.calcBtn}>
							{number}
						</span>
					))}
				</div>
				<div className={styles.calcPanelOperators}>
					{operators.map((operator) => (
						<span key={operator} className={styles.calcBtn}>
							{operator}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
