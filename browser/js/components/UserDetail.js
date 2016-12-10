import React, { Component } from 'react';
import UserItem from './UserItem';
import {Link} from 'react-router';
import { connect } from 'react-redux';

class UserDetail extends Component {
	
	render() {
		const users = this.props.users;
		const id = Number(this.props.params.id);
		let userArr = users.filter((user) => {
			return user.id === id;
		});
		let user = userArr[0];

		return (
			<div className="container">
		 		<UserItem user={user} ></UserItem>
			  <div className="panel panel-warning">
			    <div className="panel-heading">
			      <h2 className="panel-title large-font">stories</h2>
			    </div>
			    <ul className="list-group">
			      <p className="list-group-item story-item">
			        <span>
			        </span>
			        <button className="btn btn-warning btn-xs">
			          <span className="glyphicon glyphicon-plus"></span>
			        </button>
			      </p>
			      <p  className="list-group-item story-item">
			        <a>
			         
			        </a>
			        <button className="btn btn-default btn-xs">
			          <span className="glyphicon glyphicon-remove"></span>
			        </button>
			      </p>
			    </ul>
			  </div>
			</div>

		)
	}
}

const mapStateToProps = ({ users }, { children }) => ({ users, children });

export default connect(mapStateToProps)(UserDetail);