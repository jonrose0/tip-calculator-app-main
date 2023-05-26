import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.svg';

function App() {
	const [bill, setBill] = useState<string>('');
	const [percentage, setPercentage] = useState<string>('');
	const [percentageInput, setPercentageInput] = useState<string>('');
	const [people, setPeople] = useState<string>('');
	const [tipAmount, setTipAmount] = useState<string>('0.00');
	const [total, setTotal] = useState<string>('0.00');
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		if (people === '0') {
			setError(true);
		} else if (people !== '0') {
			setError(false);
		}
		if (bill && percentage && people) {
			const tip = (
				(parseFloat(bill) * parseFloat(percentage)) /
				parseFloat(people)
			).toFixed(2);

			const total = (
				parseFloat(bill) / parseFloat(people) +
				parseFloat(tip)
			).toFixed(2);
			setTipAmount(tip);
			setTotal(total.toString());
		}
	}, [bill, percentage, people]);

	const handleBill = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBill(e.target.value);
	};

	const handlePercentage = (
		e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.type === 'change') {
			const result = e.target as HTMLInputElement;
			setPercentageInput(result.value);
			setPercentage(`.${result.value}`);
		} else if (e.type === 'click') {
			const result = e.target as HTMLButtonElement;
			setPercentageInput('');
			setPercentage(result.value);
		}
	};

	const handlePeople = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPeople(e.target.value);
	};

	const handleReset = () => {
		setBill('');
		setPercentage('');
		setPercentageInput('');
		setPeople('');
		setTipAmount('0.00');
		setTotal('0.00');
		setError(false);
	};

	return (
		<div className='app'>
			<img src={logo} alt='' />
			<div className='splitter'>
				<div className='splitter__info'>
					<label htmlFor=''>Bill</label>
					<div className='splitter__input splitter__input--bill'>
						<input
							type='text'
							placeholder='0'
							value={bill}
							onChange={handleBill}
						/>
					</div>
					<label htmlFor=''>Select Tip %</label>
					<div className='splitter__percentage'>
						<button
							className={percentage === '.5' ? 'btn btn--selected' : 'btn'}
							value='.5'
							onClick={handlePercentage}
						>
							5%
						</button>
						<button
							className={percentage === '.10' ? 'btn btn--selected' : 'btn'}
							value='.10'
							onClick={handlePercentage}
						>
							10%
						</button>
						<button
							className={percentage === '.15' ? 'btn btn--selected' : 'btn'}
							value='.15'
							onClick={handlePercentage}
						>
							15%
						</button>
						<button
							className={percentage === '.25' ? 'btn btn--selected' : 'btn'}
							value='.25'
							onClick={handlePercentage}
						>
							25%
						</button>
						<button
							className={percentage === '.50' ? 'btn btn--selected' : 'btn'}
							value='.50'
							onClick={handlePercentage}
						>
							50%
						</button>
						<input
							className='splitter__percentage-input'
							type='text'
							placeholder='Custom'
							value={percentageInput}
							onChange={handlePercentage}
						/>
					</div>
					<div className='splitter__people-number-label'>
						<label htmlFor=''>Number of People</label>
						<small
							className={
								error
									? 'splitter__people-number-invalid-message splitter__people-number-invalid-message--active'
									: 'splitter__people-number-invalid-message'
							}
						>
							Can't be zero
						</small>
					</div>
					<div className='splitter__input splitter__input--people-number'>
						<input
							className={error ? 'splitter__input--invalid' : ''}
							type='text'
							placeholder='0'
							value={people}
							onChange={handlePeople}
						/>
					</div>
				</div>
				<div className='splitter__display'>
					<div className='splitter__display-info'>
						<div>
							<p>Tip Amount</p>
							<p className='splitter__display-sub-heading'>/ person</p>
						</div>
						<div className='splitter__display-value'>${tipAmount}</div>
					</div>
					<div className='splitter__display-info'>
						<div>
							<p>Total</p>
							<p className='splitter__display-sub-heading'>/ person</p>
						</div>
						<div className='splitter__display-value'>${total}</div>
					</div>
					<button
						className={
							bill && percentage && people
								? 'btn btn--reset btn--reset--active'
								: 'btn btn--reset'
						}
						onClick={handleReset}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
