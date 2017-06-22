import React, {Component} from 'react';
import axios from 'axios';
import zip from 'lodash/zip';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class ListPolls extends Component {
	constructor(props){
		super(props);
		this.state = {
			question: [],
			options: [],
			id: ''
		}
	this.onClick = this.onClick.bind(this);
	this.onClickResults = this.onClickResults.bind(this);
	this.onClickVote = this.onClickVote.bind(this);
	}
	onClick(e) {
	//console.log(this.state.id[e.target.dataset.bla])
	if(this.state.id[e.target.dataset.bla] !== undefined ){
	this.context.router.history.push(`/r/${this.state.id[e.target.dataset.bla]}`);
	}}//end-onClick
	onClickResults(e) {
	//console.log(this.state.id[e.target.dataset.bla2])
	this.context.router.history.push(`/r/${this.state.id[e.target.dataset.bla2]}`);
	}//end-onClick
	onClickVote(e) {
	//console.log(this.state.id[e.target.dataset.bla2])
	this.context.router.history.push(`/v/${this.state.id[e.target.dataset.bla3]}`);
	}//end-onClick
componentDidMount(){
	axios.get('/api/data').then(res => {	
	const obj = res.data.data;
	let question = [];
	for(let i=0; i<obj.length; i++) {
		question.push(obj[i].question)
	}
	let options = [];
	for(let i=0; i<obj.length; i++) {
		options.push(obj[i].options)
	}
	let id = [];
	for(let i=0; i<obj.length; i++) {
		id.push(obj[i]._id)
	}
	//console.log(options)
	//console.log(options[0].toString())
	this.setState({ question: question, options: options, id: id })	
	});
}
	render(){
	let numPolls = this.state.question.length;
	const { question, options } = this.state;
	let z = zip(question, options);
	let x = z.map(([question,options], i) => {
		return (
			<div onClick={this.onClick} data-bla={i} key={i} className='text-center' 
			style={{border: '1px solid black', cursor: "pointer"}}>
				<p>question: {question}</p>
				<p>poll options: {options.toString()}</p>
				<button data-bla2={i} onClick={this.onClickResults}>Results</button>
				<button data-bla3={i} onClick={this.onClickVote}>Vote</button>
			</div>
			)		
	}
		)
		return(
		<div>{x}</div>
			)
	}
}

ListPolls.contextTypes = {
	router: PropTypes.object.isRequired
}

export default ListPolls;
//to NavigationBar.js

//Depicts current polls in db