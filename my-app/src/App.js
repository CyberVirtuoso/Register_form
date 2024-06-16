import './App.css';
import { useState } from 'react';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const [formDataError, setFormDataError] = useState({
		emailError: null,
		passwordError: null,
		passwordConfirmError: null,
	});

	const onChangeEmail = ({ target }) => {
		setFormData({ ...formData, email: target.value });

		let error = null;

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
			error =
				'Почта должа содержать символы до и после @, а также домен после точки.';
		}

		setFormDataError({ ...formDataError, emailError: error });
	};
	const onChangePassword = ({ target }) => {
		setFormData({ ...formData, password: target.value });

		let error = null;

		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				target.value,
			)
		) {
			error = [
				'как минимум одна строчная буква.',
				'как минимум одна заглавная буква.',
				'как минимум одна цифра.',
				'как минимум один специальный символ.',
				'длина пароля должна быть не менее 8 символов.',
			];
		}

		setFormDataError({ ...setFormDataError, passwordError: error });
	};
	const onChangePasswordConfirm = ({ target }) => {
		setFormData({ ...formData, passwordConfirm: target.value });

		let error = null;

		if (formData.password !== formData.passwordConfirm) {
			error = 'Пароли не совпадают.';
		}

		setFormDataError({ ...formDataError, passwordConfirmError: error });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};

	return (
		<div className="App">
			<h1>Регистрация</h1>
			<form onSubmit={onSubmit}>
				{formDataError.emailError && <div>{formDataError.emailError}</div>}
				<input
					name="email"
					type="email"
					value={formData.email}
					onChange={onChangeEmail}
					placeholder="email"
				/>
				{formDataError.passwordError && (
					<div>
						Пароль должен содержать:
						<ul>
							{formDataError.passwordError.map((error) => {
								<li>{error}</li>;
							})}
						</ul>
					</div>
				)}
				<input
					name="password"
					type="password"
					value={formData.password}
					onChange={onChangePassword}
					placeholder="password"
				/>
				{formDataError.passwordConfirmError && (
					<div>{formDataError.passwordConfirmError}</div>
				)}
				<input
					name="password_confirm"
					type="password"
					value={formData.passwordConfirm}
					onChange={onChangePasswordConfirm}
					placeholder="password confirm"
				/>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
