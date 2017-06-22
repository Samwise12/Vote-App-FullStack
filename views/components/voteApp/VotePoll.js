import React, {Component} from 'react';
import axios from 'axios';
import zip from 'lodash/zip';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import { setCurrentUser } from '../../actions/authActions';
import { addPollId } from '../../actions/voteCheckAction';

class votePoll extends Component {
	constructor(props){
		super(props);
		this.state = {
			question: [],
			options: [],
			id: null,
			voteCount: null,
			redirect: null,
		}
	this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		let data = {
			id: this.state.id,//url id
			voteId: e.target.id,
			voteCount: this.state.voteCount,
			pollId: this.props.voteId.user.username//username
		}
		//console.log(e.target.id)
		console.log(data)
	axios.put('/api/data', { data }).then(
		axios.post('/api/pollId', { data }).then(
		(response) => {
		localStorage.setItem('pollId', data.id);
		this.props.addPollId(data.id)
			// console.log(response.data)
			this.setState({ redirect: '/r/'+
			this.props.history.location.pathname.slice(3) })
		})
			);
	}

componentDidMount(){
	//console.log(this.props.voteId.user.username)
	axios.get('/api/data').then(res => {	
	//console.log(res.data.data)
	const obj = res.data.data;
	let question = [];
	for(let i=0; i<obj.length; i++) {
		question.push(obj[i].question)
	}
	//console.log(this.props.history.location.pathname.slice(3))
	//console.log(obj[0])
	let options =  obj[0].options;
	 //console.log(options)
	 //console.log(obj[0]._id)
	 //console.log(obj[0].voteCount)
	 let voteCount = obj[0].voteCount
	 let id = obj[0]._id
	this.setState({ question: question, options: options, id: id, 
	voteCount: voteCount })	
	});//checkbelow
	//axios.get('/api/users/'+ this.props.username).then(res => {
	//console.log(res.data.user[0].pollId[0])
	// console.log(res.data.user[0])
	//})
}
	render(){
	let numPolls = this.state.question.length;
	const { question, options } = this.state;
	let x = options.map((options, i) => {
		return (
			<div key={i} className='text-center' 
			style={{border: '1px solid red'}}>
				<p> {options} &nbsp;
				<input type='radio' onClick={this.onClick}
				name='group1' value={options} id={i} /> </p>				
			</div>
			)		
	}
		)
	//console.log(this.props.username)
		return(<div>
	{this.state.redirect ? 
	<Redirect to={{ pathname: this.state.redirect }} /> :			
	<div>
		<p>question: {question}</p>
		poll options:
		<form>{x}</form>
	</div>
	}
		</div>
			)
	}
}

votePoll.propTypes = {
	voteId: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		voteId: state.auth,
		username: state.auth.user.username
	}
}

//export default votePoll;
export default connect(mapStateToProps, { addPollId })(votePoll);
//to NavigationBar.js

//Depicts current polls in db

