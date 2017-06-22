import React, {Component} from 'react';
import axios from 'axios';
import zip from 'lodash/zip';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
	}

componentDidMount(){
	axios.get('/api/data').then(res => {	
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
	 //console.log(obj[0].voteCount)
	this.setState({ question: question, options: options, id: id, 
	voteCount: voteCount })	
	});
}
	render(){
	let numPolls = this.state.question.length;
	const { question, options, voteCount } = this.state;
	//console.log(voteCount);
	let z = zip(voteCount, options);
	let x = z.map(([voteCount,options], i) => {
		return (
			<div key={i} className='text-center' 
			style={{border: '1px solid red'}}>
				<p>
			 {options} &nbsp; votes: {voteCount.toString()}
				</p>								
			</div>
			)		
	}
		)
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

export default votePoll;
//to NavigationBar.js

//Depicts current polls in db