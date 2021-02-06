import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

import React, { Fragment } from "react";
import SortableList from 'react-sortable-list';
import { data } from "jquery";

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			companies: [],
			roles: [],
			companiesHtml: [],
			rolesHtml: [],
			allChecked: false,
			sortableCompanies: []
		};
		//		this.companies_delta = [];
		//		this.roles_delta = [];

		this.companiesNode = React.createRef();
		this.rolesNode = React.createRef();
	}

	componentDidMount() {
		fetch("http://localhost:5000/data")
			.then(response => response.json())
			.then(result => {
				let companies = result.companies.map((item, i) => {
					return item.name;
				});
				let roles = result.roles.map((item, i) => {
					return item.name;
				});

				let companiesList = result.companies.map(
					(item, i) => {
						return (
							<div key={i + 1}>
								<label htmlFor="companies">
									<div className="custom-control custom-checkbox">
										<input
											type="checkbox"
											name="companyName"
											className="company"
											value={item.name}
											data-roles={item.roles}
											onChange={this.toggleCompanies}
											id={`${item.name}`}
										/>
										<span>{item.name}</span>
										<span>{item.checked}</span>
									</div>
								</label>
							</div>
						);
					});

				let sortableCompanies = <SortableList data={companies} />;

				let rolesList = result.roles.map(
					(item, i) => {
						return (
							<div key={i + 1}>
								<label htmlFor="roles">
									<div className="custom-control custom-checkbox">
										<input
											type="checkbox"
											name="roleName"
											className="roleName roleHidden"
											value={item.name}
											onChange={this.toggleRoles}
											checked={this.state.checked}
											id={`${item.name}`}
										/>
										<span className="black-color black-bg">{item.name}</span>
										<span>{item.checked ? "checked" : ""}</span>
									</div>
								</label>
							</div>
						);
					}
				);

				this.setState(
					{
						data: result,
						companies: companies,
						roles: roles,
						companiesHtml: companiesList,
						rolesHtml: rolesList,
						sortableCompanies: sortableCompanies
					}
				);
			},
				error => {
					this.setState(error);
				});

	} 

	// find roles for a company: default format string
	findRolesMapping = (companyToRoles, format = false) => {
		const ids = companyToRoles.split(",");
		let roleNames = ids.map((val, i) => {
			return this.state.data.roles.map(v => {
				if (val.indexOf(v.id) != -1) {
					return v.name;
				}
				else {
					return null;
				} 
			})
				.filter(x => x)			// filter all kinds of nulls, undefined, empty values
		});
		return format ? roleNames.join(",") : roleNames;
	}

	toggleCompanies = (e) => {
		let checkedCompanies = document.querySelectorAll('[name=companyName]:checked');
		// console.log(checkedCompanies);
		const roles = this.state.companies.map((val, i) => {
			if (val == e.target.value) {
				return this.findRolesMapping(e.target.getAttribute("data-roles"), true);	// fetch in array form
			}
		})
		.filter(x => x);

		roles.map((val, i) => {
			val.split(",").map((v) => {
				if (e.target.checked) {
					document.getElementById(v).nextSibling.className = "black-color green-bg";
				}
				else {
					document.getElementById(v).nextSibling.className = "black-color black-bg";
				}
			});
		});
	}

	toggleRoles = (e) => {
	}

	onFilterSave = (e) => {
		e.preventDefault();
		const selectedCompanies = document.querySelectorAll('[name=companyName]:checked');
		window.location.href = "/survey/"+ selectedCompanies;
	};

	rolesCheckAll = (e) => {
		e.preventDefault();
	}

	componentWillUpdate = (e) => {
		// console.log(this.state.companies);
	}

	componentDidUpdate = (e) => {
		// console.log('comp updated');
	}

	CompaniesCheckAll = (e) => {
		let companiesNodes = [...document.getElementsByName('companyName')];
		if (e.target.checked) {
			companiesNodes.map((val, i) => {
				val.checked = true;
			});
		}
		else {
			companiesNodes.map((val, i) => {
				val.checked = false;
			});
		}
	}


	render() {
		return (
			<div id="filters" className="filters container">
				<h3>Filters</h3>
				<form onSubmit={this.onFilterSave}>
					<div className="row filter-checkboxes">
						<div className="col-md-6">
							<div>
								<div key={0}>
									<label htmlFor="companies">
										<div className="custom-control custom-checkbox">
											<input
												type="checkbox"
												name="allcompanies"
												className=""
												value="checkAllCompanies"
												id="company-0"
												onChange={this.CompaniesCheckAll}
											/>
											<span>Companies</span>
										</div>
									</label>
								</div>

								{this.state.companiesHtml}


							</div>
						</div>

						<div className="col-md-6" id="output">
							<div>
								<div key={0}>
									<label htmlFor="roles">
										<div className="custom-control custom-checkbox">
											<input
												type="checkbox"
												name="allroles"
												className=""
												value="checkAllRoles"
												id="role-0"
											/>
											<span>Roles</span>
										</div>
									</label>
								</div>

								{this.state.rolesHtml}

							</div>
						</div>
						<div className="col-md-12 text-right">
							<button type="reset" className="btn btn-default">Cancel</button>
							<button type="submit" className="btn btn-primary">Show Companies in Tabs</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Checkbox;
