import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPollId } from '../../actions/voteCheckAction';

class PollForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			optionCount: 3,
			redirect: null,
			id: null
		}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
	}
	//methods
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		const { question } = this.refs;
		//console.log(this.refs)
		const data = {
			question: question.value.trim(),
			options: [],
			voteCount: []
		}
		for (const option in this.refs) {
			if (option !== 'question' && this.refs[option].value !== '') {
				data.options.push(this.refs[option].value)
			}
		}
		//console.log(data.options)
		for (const option in this.refs) {
			if (option !== 'question' && this.refs[option].value !== '') {
				data.voteCount.push(0)
			}
		}
		//console.log(data);
		axios.post('/api/data',{ data : data }).then(			
			(response) => {
		this.setState({id: response.data._id})
		//this.props.addPollId(response.data._id)
		this.setState({ redirect: '/v/'+response.data._id })
		}
			)
		//axios.post('/api/data',  { data : data }  ).then(
			//console.log(response.data._id)
		//	)
	}//end-onSubmit
	createOptions() {
			const { optionCount } = this.state;
			let options = [];
			for (var i=0; i<optionCount;i++) {
				const index = i+1
			let addOption, removeOption;
			if(index === optionCount) {
				addOption = this.addOption.bind(this)
			}
				const optionInput = (
			<div key={index}>
			<label>Option {index}</label>
					<input type='text' 
					ref={`option${index}`} 
					onFocus={addOption}
					onBlur={removeOption}
					placeholder='Enter poll option...'/>				
			<br/>
			</div> 
					)
				options.push(optionInput)
			}
			return options
	}//end-createOptions()
	addOption() {
		this.setState({optionCount: this.state.optionCount + 1})
	}
	removeOption() {
		this.setState({optionCount: this.state.optionCount - 1})
	}
	///render
	render(){
		const options = this.createOptions()
		return(
			<div>
	{this.state.redirect ? 
		<Redirect to={{ pathname: this.state.redirect }} /> :
		<form onChange={this.onChange} onSubmit={this.onSubmit}>
		<label>Question:</label>
		<input ref='question' type='text' placeholder='Enter a question...' />
		{options}		
		<button>Submit</button>
		</form>
	}
		</div>
			)
	}//end-render
}

PollForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { addPollId })(PollForm);
//to PollPage.js

