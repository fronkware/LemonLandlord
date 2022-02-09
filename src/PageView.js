import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './PageView.css';

const wellStyles = { display: 'flex', flexDirection: 'column',height:'100%'};

class PageView extends Component {

	constructor(props){
		super(props);
		this.state = {treePath: 0};
		this.treeLabel = "What is the emergency"
		this.handleClick = this.handleClick.bind(this);
		this.returnToStart = this.returnToStart.bind(this);
		this.buttonsInstance = (
			<div>
			    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
			      Cardiac/Heart
			    </Button>
			    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
			      Breathing
			    </Button>
			     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='2'>
			      Bleeding
			    </Button>
			     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='3'>
			      Unsure
			    </Button>
			</div>
		);
	}

	handleClick(e) {
		var currState = this.state.treePath;
		var id = e.target.id;
		switch(currState){
			case 0:
				this.path0(id);
				break;
			case 1:
				this.path1(id);
				break;
			case 2:
			this.path2(id);
				break;
			case 3:
				this.path3(id);
				break;
			case 4:
			this.path4(id);
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			case 99:
				this.path99(id);
				break;
			case 100:
				this.path100(id);
				break;
			case 101:
				this.path101(id);
			default:
				break;
		}
	}

	path0(id)
	{
		switch(parseInt(id,10)){
			case 0:
				this.treeLabel = "Do they have a pulse";
				this.buttonsInstance = (
					<div>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
					      No Pulse
					    </Button>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
					      Pulse
					    </Button>
					    
					</div>

				);
				this.setState((state) => ({ treePath:1}));
				break;
			case 1:
				this.treeLabel = "What is the breathing issue?";
				this.buttonsInstance = (
					<div>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
					      Allergy
					    </Button>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
					      Chocking
					    </Button>
					     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='2'>
					      Asthma
					    </Button>
					     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='3'>
					      Unsure
					    </Button>
					</div>

				)
				this.setState((state) => ({ treePath:2}));
				break;
			case 2:
				this.treeLabel = "Apply direct pressure to the wound";
				this.buttonsInstance = (<img src="https://i.gifer.com/HS2k.gif" alt="Gif stop the blood"/>);
				this.setState((state)=> ({treePath:3}));
				break;
			case 3:
				this.treeLabel = "Do they have a pulse?";
				this.buttonsInstance = (
					<div>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
					      Yes
					    </Button>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
					      No
					    </Button>
					</div>
					);
				this.setState((state)=> ({treePath:99}));
				break;
		}
	}

	path1(id)
	{
		switch(parseInt(id,10)){
			case 0:
			this.treeLabel = "Call 911. No AED is near: PERFORM CPR"
			this.buttonsInstance = (<img src="https://media.giphy.com/media/d07PtnTq0oVsk/giphy.gif" alt="Gif og CPR"/>);
			this.setState((state) => ({treePath:20}));
			break;

			case 1:
			//Goes to unsure
			this.path99(0);
			break;

		}
	}

	path4(id)
	{
		switch(parseInt(id,10)){
			case 0:
			this.treeLabel = "Apply Pressure: Are they maintaining a pulse";
				this.buttonsInstance = (<img src="https://i.gifer.com/HS2k.gif" alt="Gif stop the blood"/>);
				this.setState((state)=> ({treePath:3}));
				break;
		}
	}

	path2(id)
	{
		switch(parseInt(id,10)){
			case 0:
				this.treeLabel = "If patient has EpiPen, encourage its use.";
				this.buttonsInstance = (<img src="https://snacksafely.com/wp-content/uploads/2017/05/EpiPens-696x364.jpg" alt="EpiPen"/>);
				this.setState((state)=> ({treePath:60}));
				break;
			case 1:
				this.treeLabel = "If they have difficulty breathing, preform abdominal thrusts";
				this.buttonsInstance = (<img src="https://www.padelandia.com/wp-content/uploads/2014/01/animacion-maniobra-de-heimlich.gif" alt="preform abdominal"/>);
				this.setState((state)=> ({treePath:61}));
				break;
			case 2:
				this.treeLabel = "Give inhaler and call 911";
				this.buttonsInstance = (<div></div>);
				this.setState((state)=> ({treePath:62}));
				break;
			case 3:
				this.treeLabel = "Wait 2-3 minutes. If it gets worse call 911";
				this.buttonsInstance = (<div></div>);
				this.setState((state)=> ({treepath:63}));
				break;
		}
	}

	path99(id)
	{
		switch(parseInt(id,10)){
			case 0:
				this.treeLabel = "How is there breathing?";
				this.buttonsInstance = (
					<div>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
					      Adequate Breathing
					    </Button>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
					      Troubled Breathing
					    </Button>
					</div>
					);
				this.setState((state) => ({ treePath:100}));
				break;
			case 1:
				this.path1(0);
				break;
		}
	}

	path100(id)
	{
		switch(parseInt(id,10))
		{
			case 0:
				this.treeLabel = "What is the issue?";
				this.buttonsInstance = (
					<div>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
					      Bleeding
					    </Button>
					    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
					      Other
					    </Button>
					     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='2'>
					      Poison/Foreign Substance
					    </Button>
					     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='3'>
					      Seizure
					    </Button>
					</div>
					);
				this.setState((state) => ({ treePath:101}));
				break;
			case 1:
				//Go To troubled Breathing
				this.path0(1);
				break;
		}
	}

	path101(id){
		switch(parseInt(id,10))
		{
			case 0:
				this.path0(2);
				break;
			case 1:
				this.treeLabel = "Wait 2-3 minutes, if it doe not get better call 911";
				this.buttonsInstance = (<div> </div>);
				this.setState((state) => ({ treePath:102}));
				break;
			case 2:
				this.treeLabel = "Do not attempt to get them to throw up";
				this.buttonsInstance = (<img src="http://www.nebraskapoison.com/App_Files/images/poisonHelp.gif" alt="posion center"/>);
				this.setState((state) => ({ treePath:103}));
				break;
			case 3:
				this.treeLabel = "Wait 2-3 Minutes";
				this.buttonsInstance = (<div> </div>);
				this.setState((state) => ({ treePath:104}));
				break;
		}
	}

	returnToStart()
	{
		this.setState((state) => ({ treePath:0}));
		this.treeLabel = "What is the emergency";
		this.buttonsInstance = (
			<div>
			    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='0'>
			      Cardiac/Heart
			    </Button>
			    <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='1'>
			      Breathing
			    </Button>
			     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='2'>
			      Bleeding
			    </Button>
			     <Button bsStyle="primary" bsSize="lg" block onClick={this.handleClick} id='3'>
			      Unsure
			    </Button>
			</div>
		);
	}

	render() {
		return (
		<div>
			<div >
				<div className="well" style={wellStyles}>
				  	<div className="treeLabel">
				  		<h1>
				  		{this.treeLabel}
				  		</h1>
				  	</div>
				  	<div className="separator"></div>
				  	<div className="butGroup">
				  		{this.buttonsInstance}
				  		<div className="separator"></div>
				  		<Button bsStyle="warning" bsSize="medium" block onClick={this.returnToStart}>
					      Return to Start
					    </Button>
				  	</div>
				</div>
			</div>
		</div>
	    );
	}
}

export default PageView;
