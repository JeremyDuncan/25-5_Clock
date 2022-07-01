const root = ReactDOM.createRoot(
  document.getElementById('root')
);

class ReactApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,  
      timer:"25:00",      // Timer Display
      stoptime: true, 
      min: 25,            // Minutes
      sec: "0"+0,         // Seconds
      timeForBreak: false
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
    if(this.state.stoptime == true) {
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

  //=================== Start BREAK Timer Functions ===========================>
  
  setBreakTimer = () => { 
    this.setState({min: this.state.min = this.state.breakLength}); // Changes minutes to break minutes
  }

  takeABreak = () => {
    this.setState({timeForBreak: this.state.timeForBreak = true}); // switches break state to true
  }
  startBreak = () => { 
    this.takeABreak();
    this.setBreakTimer(); 
  }


  //=================== Start WORK Timer Functions ===========================>
  goToWork = () => {
    this.setState({timeForBreak: this.state.timeForBreak = false}); // switches break state to false
  }

  startWork = () => {
    this.goToWork();
    this.setMinutes();
  }

  // ========== Minutes & Seconds functions ==================================>

  countDown = () => {     // updates the timer display
    this.setState({timer: this.state.timer = this.state.min + ':' + this.state.sec});
  }
  reduceSec = () => {     // reduces Seconds state by 1 
    this.setState({sec: this.state.sec = this.state.sec - 1});
  }
  reduceMin = () => {     // reduces Minutes state by 1
    this.setState({min: this.state.min = this.state.min - 1});
  }
  resetSec = () => {      // moves Seconds state to 59 (to count down to 0 again)
    this.setState({sec: this.state.sec = 59});
  }
  addZeroToSec = () => {  // Adds 0 in front of Seconds ( 00, 01, 02, 03..)
    this.setState({sec: this.state.sec = "0" + this.state.sec});
  }
  addZeroToMin = () => {  // Adds 0 in front of Minutes ( 00, 01, 02, 03..)
    this.setState({min: this.state.min = "0" + this.state.min});
  }
  parseSec = () => {      // turns string number from Seconds state into Integer ( "01" == 1, etc)
    this.setState({sec: this.state.sec = parseInt(this.state.sec)});
  }
  parseMin = () => {      // turns string number from Minutes state into Integer ( "01" == 1, etc)
    this.setState({min: this.state.min = parseInt(this.state.min)});
  }
  resetMinutes = () => {  // Turns Minutes state into value set by sessionLength state
    this.setState({min: this.state.min = this.state.sessionLength});
  }
  resetSeconds = () => { // Turns Seconds state into value of "00"
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

    // ADD FUNCTIONALITY <===============
    if ( this.state.sec == 0 && this.state.min == 0) { 
      this.alarm.play(); 
      if(this.state.timeForBreak === false){ // changes timer if minutes and seconds equal zero
        this.startBreak();      // ADD FUNCTIONALITY Later<===============
      } else {
        this.startWork(); // ADD FUNCTIONALITY Later<===============
      }
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
  

  //=====================Break & Session Button Functions =====================>

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
        this.changeStopTime();
        this.alarm.pause();
        break;

      case '+Time':
        this.addTime();
        if(this.state.timeForBreak === false){
          this.setTimer();
          this.setMinutes(); 
        }
        break;

      case "-Time":
        this.subtractTime();
        if(this.state.timeForBreak === false){
          this.setTimer(); 
          this.setMinutes(); 
        }
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
        <audio id="beep" preload="auto" ref={(audio) => {this.alarm = audio;}} src="./sounds/alarm.mp3"/>
      </div>
    );
  }
}

root.render(
  <div>
    <ReactApp />
  </div>
);