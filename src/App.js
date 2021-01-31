import React from 'react';
import shuffle from "shuffle-array";
import { start } from "./Confetti";

var items = [];
var dimension = 5 ;
var midItem = Math.floor(dimension * dimension/2)
let slash1 = [];
let slash2 = [];
let lines = [];
for(var i = 0; i < dimension; i++){
  let row = [];
  let col = [];
  for(var o = 0; o < dimension; o++){
    row.push(o + dimension * i);
    col.push(o * dimension + i);
  }
  lines.push(row);
  lines.push(col);
  
  slash1.push(i + dimension * i);
  slash2.push((dimension - 1) * (i + 1));
}
lines.push(slash1);
lines.push(slash2);

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    data : [
        "Great success",
        "User engagement",
        "Kodiak",
        "Huge kudos to X",
        "Suboptimal",
        "Learning experience ",
        "Personalized learning",
        "Super excited ",
        "Funnel",
        "OKRs",
        "Highest company priority ",
        "It’s only a test",
        "Operate like a startup",
        "Keeping the momentum",
        "The results look promising",
        "Initial signals",
        "Can’t wait to share results ",
        "Significant increase ",
        "High quality content",
        "Keep product consistent ",
        "Data driven ",
        "Glorious X team",
        "Allocate resources ",
        "Alignment between X and Y",
        "Happy to announce",
        
      ],
      isWon: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleDrawCard = this.handleDrawCard.bind(this);
  }
  

  toggle(event){
    var table = document.getElementById("tbl");
    var divChildren = table.childNodes;
    var count = divChildren; 

    for (var i=0; i<divChildren.length; i++) {
      var elm = divChildren[i].querySelector(".tile--set")
      if(elm){
        items.push(parseInt(elm.id))     
        items.indexOf(midItem) === -1 && items.push(midItem);
      }
    }
    items.push(parseInt(event.target.id))
    items = [...new Set(items)];

    event.target.classList.toggle('tile--set')
    this.setState({isWon:false})
    for(let i = 0; i < lines.length; i++) {
      var count = 0      
      items.forEach((item)=>{
        if(lines[i].includes(item)){
            count++
        }
      })
      if(count == dimension){
        const index = lines.indexOf(lines[i]);
        if (index > -1) {
          lines.splice(i, 1);
        }
          this.setState({isWon:true})
        }
    }
  }
  
  handleDrawCard(){
    const data = shuffle(this.state.data);
    this.setState({data: data})
  }

  playGameAgain(){
    //window.location.reload(); 
    this.setState({isWon:false})
    for(var i=0; i<dimension*dimension; i++){
      if( i != midItem){
        var element = document.getElementsByClassName("tile")[i];
        element.classList.remove("tile--set");
      }
    }
  }
  
  render(){
    var {data, isWon}  = this.state
    return (
      <div className="App">
        <button onClick={() => this.handleDrawCard()}>Generate</button>
        <button onClick={() => this.playGameAgain()}>Play Again</button>
        <hr />
        <div className="wrapper" id="tbl">
          {data.map((id, key) => (
            <div>
            {key == midItem 
                ? 
                <div key={key} id={key}  
                onClick={this.toggle} className={`tile tile--set tile-${key}`} >
                Free
                </div>
                : 
                <div key={key} id={key}  
                  onClick={this.toggle} className={`tile tile-${key}`} >
                  {id} - {key}
                </div>
              }
            </div>
          ))}
        </div>
        {isWon ? <Confetti /> : null }
       
      </div>
    );
  }
}

class Confetti extends React.Component{
  componentDidMount(){
    start();
  }
  render(){
    return (
      <canvas id="canvas" />
    );
  }
}



export default App;
