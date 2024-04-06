import React, { useReducer } from "react";

const reducer = (state, action) => {
	let x = action.keyToUpdate;
	console.log("I AM WORKING");
	switch (action.type) {
		case "userNameInput":
			return { ...state, [x]: action.payload };
		case "userPasswordInput":
			return { ...state, [x]: action.payload };
		case "formError":
			return { ...state, [x]: action.payload };
		case "isLoggedIn":
			return { ...state, [x]: action.payload };

		default:
			return state;
	}
};

export default function Home() {
	const obj = {
		isLoggedIn: false,
		userNameInput: "",
		userPasswordInput: "",
		formError: false,
	};

	const [loginState, dispatch] = useReducer(reducer, obj);

	function formValidationCheck(e) {
		e.preventDefault();
		if (!loginState.userNameInput || !loginState.userPasswordInput) {
			dispatch({
				type: "formError",
				payload: true,
				keyToUpdate: "formError",
			});
		} else {
			dispatch({
				type: "formError",
				payload: false,
				keyToUpdate: "formError",
			});
			dispatch({
				type: "isLoggedIn",
				payload: true,
				keyToUpdate: "isLoggedIn",
			});
		}
	}
	return (
		<div id="main">
			{loginState.isLoggedIn && (
				<section className="logout-section">
					<h2>Logged in successfully!</h2>
					<p>Welcome username!</p>
					<button
						onClick={() =>
							dispatch({
								type: "isLoggedIn",
								payload: false,
								keyToUpdate: "isLoggedIn",
							})
						}
						className="logout-btn"
					>
						Logout
					</button>
				</section>
			)}
			{!loginState.isLoggedIn && (
				<form className="login-form">
					{loginState.formError && (
						<p className="invalid-error">
							Invalid username or password!
						</p>
					)}
					<section className="username-input">
						<label>Username: </label>
						<input
							value={loginState.userNameInput}
							type="text"
							placeholder="Username"
							className="username"
							onChange={(e) =>
								dispatch({
									type: "userNameInput",
									payload: e.target.value,
									keyToUpdate: "userNameInput",
								})
							}
						/>
					</section>
					<section className="password-input">
						<label>Password: </label>
						<input
							value={loginState.userPasswordInput}
							type="password"
							placeholder="Password"
							className="password"
							onChange={(e) =>
								dispatch({
									type: "userPasswordInput",
									payload: e.target.value,
									keyToUpdate: "userPasswordInput",
								})
							}
						/>
					</section>
					<button
						onClick={(e) => formValidationCheck(e)}
						className="login-btn"
					>
						Login
					</button>
				</form>
			)}
		</div>
	);
}
