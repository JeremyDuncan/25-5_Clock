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
      sec: "0"+0
    }
 
  }

  // functions
  //==================== Start & Stop Functions ==============================>

  changeStopTime = () => {
    if(this.state.stoptime == true){
      this.setState({stoptime: this.state.stoptime = false});
    } else {
      this.setState({stoptime: this.state.stoptime = true});
    }
  }
  startTimer = () => {
    if (this.state.stoptime == true) {
      this.changeStopTime();
      this.timerCycle();
    }
  }
  stopTimer = () => {
    if (this.state.stoptime == false) {
      this.changeStopTime();
    }
  }
  resetTimer = () => {
    this.resetMinutes();
    this.resetSeconds();
    this.setState({timer: this.state.timer = this.state.min + ":" + this.state.sec });
  }


  // ========== Minutes & Seconds functions ==================================>

  countDown = () => { 
    this.setState({timer: this.state.timer = this.state.min + ':' + this.state.sec});
  }
  reduceSec = () => { 
    this.setState({sec: this.state.sec = this.state.sec - 1});
  }
  reduceMin = () => { 
    this.setState({min: this.state.min = this.state.min - 1});
  }
  resetSec = () => { 
    this.setState({sec: this.state.sec = 59});
  }
  addZeroToSec = () => { 
    this.setState({sec: this.state.sec = "0" + this.state.sec});
  }
  addZeroToMin = () => { 
    this.setState({min: this.state.min = "0" + this.state.min});
  }
  parseSec = () => { 
    this.setState({sec: this.state.sec = parseInt(this.state.sec)});
  }
  parseMin = () => { 
    this.setState({min: this.state.min = parseInt(this.state.min)});
  }
  resetMinutes = () => {
    this.setState({min: this.state.min = this.state.sessionLength});
  }
  resetSeconds = () => {
    this.setState({sec: this.state.sec = "0" + 0});
  }


  //======================= Timing Function ===================================>

  timerCycle = () => {
    if (this.state.stoptime == false) {
      this.parseSec();
      this.parseMin();
      
    if(this.state.sec > 0) {      // If seconds greater than zero
      this.reduceSec();           // reduce second by 1
    }else {                       // else...
      this.resetSec();            // reset seconds back to 60
    }

    if (this.state.sec == 59) {   // if seconds equal 60
      if(this.state.min > 0){                             
        this.reduceMin();         // reduce minutes by 1
      }         
    }

    if ( this.state.sec == 0 && this.state.min == 0) {  // Stops timer if minutes and seconds equal zero
      this,this.stopTimer();
    }
    if (this.state.sec < 10 || this.state.sec == 0) {   // make sure that sec format is 00, 01, 02...
      this.addZeroToSec();
    }
    if (this.state.min < 10 || this.state.min == 0) {   // make sure that min format is 00, 01, 02...
      this.addZeroToMin();
    }
      
    this.countDown();                           // Updates Timer state
    setTimeout(() => this.timerCycle(), 1000);  // Repeats function every second
    }
  }
  

  //=====================Break & Session Functions ============================>

  // Adds 1 minute to sessionLength state
  addTime = () => {       
    if(this.state.sessionLength < 60){
      this.setState({sessionLength: this.state.sessionLength = this.state.sessionLength + 1}); 
    }
  }
  // Subtracts 1 minute from sessionLength state
  subtractTime = () => {  
    if(this.state.sessionLength > 1) {
      this.setState({sessionLength: this.state.sessionLength = this.state.sessionLength - 1});
    }
  }
  // Sets initial timer to sessionLength state
  setTimer = () => {  
    this.setState({time: this.state.timer = this.state.sessionLength + ":00"});
  }
  // Sets min state to sessionLength
  setMinutes = () => { 
    this.setState({min: this.state.min = this.state.sessionLength});
  }
  // Add 1 minute to breakLength
  addBreak = () => {
    if(this.state.breakLength < 60){
      this.setState({breakLength: this.state.breakLength = this.state.breakLength + 1});
    }
  }
  // Subtract 1 minute from breakLength
  subtractBreak = () => {
    if(this.state.breakLength > 1){
      this.setState({breakLength: this.state.breakLength = this.state.breakLength - 1});
    }
  }
  //ADD FUNCTIONALITY TO THIS
  setBreakTimer = () => { 
    // do this ===>
  }
 

  //================= handleClick() Function ==================================>
  // This one function handles every click from user by using a switch
  // depending on button pressed, it calls the appropriate functions

  handleClick = (button) => {
    switch (button) {
      case 'start-stop':
        if(this.state.stoptime ==  true) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
        break;

      case 'reset':
        this.resetTimer();
        break;

      case '+Time':
        this.addTime();
        this.setTimer();
        this.setMinutes(); 
        break;

      case "-Time":
        this.subtractTime();
        this.setTimer(); 
        this.setMinutes(); 
        break;

      case '+Break':
        this.addBreak(); 
        //ADD FUNCTIONALITY<=========
        break;

      case "-Break":
        this.subtractBreak();
        //ADD FUNCTIONALITY<==========
        break;

      default:
       alert("WIERD BUG!!");
    }
  }


// ======================== RENDER HTML Section ===============================>

  render() {
    // Console logs for troubleshooting and debugging
    // ==>
    // ==>
    return (
      <div id="wrapper">
        <h1>25 + 5 Clock</h1>

        <div id="break-label"> <h2>Break Length</h2> </div>
        <button id="break-increment" onClick={() => { this.handleClick("+Break") }}>+ Break Time</button>
        <button id="break-decrement" onClick={() => { this.handleClick("-Break") }}>- Break Time</button> 
        <div id="break-length"> <h3>{this.state.breakLength}</h3> </div>

        <div id="session-label"> <h2>Session Length</h2> </div>
        <button id="session-increment" onClick={() => { this.handleClick("+Time") }}>+ Time</button>
        <button id="session-decrement" onClick={() => { this.handleClick("-Time") }}>- Time </button>
        <div id="session-length"> <h3>{this.state.sessionLength}</h3> </div>

       
        
        
        
        
        
       
        <div id="timer-label"> <h2>Session</h2> </div>
        <div id="time-left"> <h1>{this.state.timer}</h1> </div>

        <button id="start_stop" onClick={() => { this.handleClick("start-stop") }}> START / STOP</button> 
        <button id="reset" onClick={() => { this.handleClick("reset") }}>Reset</button>

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