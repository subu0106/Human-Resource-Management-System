import React, { Component } from "react";
import './css/allEmployees.css';

/**
 * @typedef Leave
 * @prop {string} leave_id
 * @prop {Array<string>} dates
 * @prop {string} status
 */

class RequestNewLeave extends Component {
	state = {
		typesOfLeave: ["Annual", "Casual", "Maternity", "No-pay"],
		newLeave_dates: [],
		newLeave_reason: "",
		newLeave_type: "",
		error: "",
	};

	updateState(partialState) {
		this.setState({
			...this.state,
			...partialState,
		});
	}

	submitLeaveRequest() {
		const type = this.state.newLeave_type,
			reason = this.state.newLeave_reason,
			dates = this.state.newLeave_dates;

		let newErrorMessage = "";
		if (type == "") {
			newErrorMessage = "Type of Leave is not selected";
		}
		if (reason == "") {
			newErrorMessage = "Reason for Leave is not provided";
		}
		if (dates.length == 0) {
			newErrorMessage = "No dates for Leave is provided";
		}
		if (!this.state.typesOfLeave.includes(type)) {
			newErrorMessage = "Type of Leave is not recognized";
		}

		if (newErrorMessage != "") {
			this.updateState({
				error: newErrorMessage,
			});
			return;
		}

		// TODO send the info to backend
	}

	render() {
		console.log("RequestNewLeave");

		return (
			<section
				className="request-new-leave"
				style={{
					backgroundColor: "white",
					padding: "15px 10px",
				}}
			>
				<div>
					<h1>Request New Leave</h1>
					<div>
						<label>
							Type of Leave
							<select
								name="type-of-leave"
								onChange={(event) => {
									this.updateState({
										newLeave_type: event.target.value,
									});
								}}
							>
								<option value="">-- Select an option --</option>
								{this.state.typesOfLeave.map((typeOfLeave) => {
									return (
										<option key={typeOfLeave} value={typeOfLeave}>
											{typeOfLeave}
										</option>
									);
								})}
							</select>
						</label>
						<label>
							Reason
							<input
								type="text"
								name="reason"
								onChange={(event) => {
									this.updateState({
										newLeave_reason: event.target.value,
									});
								}}
							/>
						</label>
						<div>
							<label>Dates</label>
							<div>
								{this.state.newLeave_dates.length == 0
									? "No dates selected"
									: this.state.newLeave_dates.map((date) => {
											return <div>{date}</div>;
									  })}
							</div>
							<div
								style={{
									display: "flex",
									gap: "5px",
									marginBottom: "10px",
								}}
							>
								<input
									type="date"
									style={{
										marginBottom: "0",
									}}
									id="date-input"
								/>
								<button
									style={{
										boxSizing: "border-box",
										height: "100%",
										width: "fit-content",
									}}
									onClick={() => {
										const element = document.getElementById("date-input");
										if (
											!(element instanceof HTMLInputElement) ||
											element.type != "date"
										) {
											throw new Error(
												"#date-input element is missing or is not a input[type=date]"
											);
										}
										if (element.value == "") {
											return;
										}
										this.updateState({
											newLeave_dates: this.state.newLeave_dates.concat(
												element.value
											),
										});
									}}
								>
									Add
								</button>
							</div>
						</div>
						<div></div>
						{this.state.error == "" ? null : (
							<div style={{ color: "red" }}>{this.state.error}</div>
						)}
						<button onClick={this.submitLeaveRequest}>Submit</button>
					</div>
				</div>
			</section>
		);
	}
}

export default RequestNewLeave;
