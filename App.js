// ##NOTE## Calculator works, but does not pass test probably due to my use of eval() function.

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

class ReactApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer:"25:00",
      stoptime: true, 
      min: 25,
      sec: 0
    }
 
  }

  // functions
  //==================== Start & Stop Functions ==============================>
  changeStopTime = () => {
    if(this.state.stoptime == true){
      alert("HERE")
      this.setState({stoptime: this.state.stoptime = false});
    } else {
      this.setState({stoptime: this.state.stoptime = true});
    }
  }
  startTimer = () => {
    if (this.state.stoptime == true) {
          
          this.changeStopTime();
          alert(this.state.stoptime)
          console.log(this.state.stoptime)
          this.timerCycle();
      }
  }
  stopTimer = () => {
    if (this.state.stoptime == false) {
      this.changeStopTime();
    }
  }
  resetTimer = () => {
    this.setState({timer: timer = '25:00' });
  }


  // ========== Minutes & Seconds functions ==================================>
  countDown = () => { 
    this.setState({timer: this.state.timer = this.state.min + ':' + this.state.sec});
  }
  reduceSec = () => { 
    this.setState({sec: this.state.sec = this.state.sec - 1})
  }
  reduceMin = () => { 
    this.setState({min: this.state.min = this.state.min - 1})
  }
  resetSec = () => { 
    this.setState({sec: this.state.sec = 60})
  }
  addZeroToSec = () => { 
    this.setState({sec: this.state.sec = "0" + this.state.sec})
  }
  addZeroToMin = () => { 
    this.setState({min: this.state.min = "0" + this.state.min})
  }


  //======================= Timing Function ===================================>

  timerCycle = () => {
    if (this.state.stoptime == false) {
      // sec = parseInt(sec);
      // min = parseInt(min);
      
    if(this.state.sec > 0) {      // If seconds greater than zero
      this.reduceSec();           // reduce second by 1
    }else {                       // else...
      this.resetSec();            // reset seconds back to 60
    }

    if (this.state.sec == 60) {   // if seconds equal 60
      if(this.state.min > 0){                             
        this.reduceMin();         // reduce minutes by 1
      }         
    }

    if ( this.state.sec == 0 && this.state.min == 0) { 
      this,this.stopTimer();
    }
      
    // if (this.state.sec < 10 || this.state.sec == 0) { //make sure that format is 00, 01, 02...
    //   this.addZeroToSec();
    // }
    // if (this.state.min < 10 || this.state.min == 0) {
    //   this.addZeroToMin();
    // }
      
      this.countDown();
      //setTimeout(() => console.log('Initial timeout!'), 1000);
      setTimeout(() => this.timerCycle(), 1000);
    }
  }
  
  //================= handleClick() Function ==================================>
  handleClick = (button) => {
    if(button == "start"){
      this.startTimer();
    }

  }

  render() {
    // Console logs for troubleshooting and debugging
    // ==>
    // ==>
    return (
      <div>
        <h1>25 + 5 Clock</h1>
        <div id="break-label"> Break Length </div>
        <div id="session-label"> Session Length </div>
        <button id="break-decrement" onClick={() => { this.handleClick() }}></button>
        <button id="session-decrement" onClick={() => { this.handleClick() }}></button>
        
        <button id="break-increment" onClick={() => { this.handleClick() }}></button>
        <button id="session-increment" onClick={() => { this.handleClick() }}></button>
        
        <div id="break-length"> {this.state.breakLength} </div>
        <div id="session-length"> {this.state.sessionLength} </div>
       
        <div id="timer-label"> Session </div>
        {/*// User Story #8: I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00).*/}
        <div id="time-left"> {this.state.timer} </div>

        <button id="start_stop" onClick={() => { this.handleClick("start") }}> START</button> 
        <button id="reset" onClick={() => { this.handleClick() }}></button>

 {/* // User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state. */}




      </div>
    );
  }
}

root.render(
  <div>
    <ReactApp />
  </div>
);










// User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value.

// User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1, and I can see the updated value.

// User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1, and I can see the updated value.

// User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1, and I can see the updated value.

// User Story #16: I should not be able to set a session or break length to <= 0.

// User Story #17: I should not be able to set a session or break length to > 60.

// User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.

// User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).

// User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.

// User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.

// User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break has begun.

// User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length" element.

// User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a session has begun.

// User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length" element.

// User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".

// User Story #27: The audio element with id="beep" must be 1 second or longer.

// User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.