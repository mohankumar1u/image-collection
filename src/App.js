import './App.css';
import React, { Component } from "react";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      displaypopup:{display:"none"},
      singleImageurl:"",
      currentPopupIndex:null
    };
  }
  

  componentDidMount(){
    window.addEventListener('scroll', this.trackScrolling);
    console.log("did Mount");
     fetch(`https://api.unsplash.com/photos/random/?client_id=LfEbYd2gWuOhsGnsDH3NqyTmv59ygVkTYL2OA-ee__s&count=30`)
      .then(function(response) {
        return response.json();
      })
      .then(result => {
       this.setState({
          data: [...result]
        });
      });
    
  }
  handleClick = (i) => {
    console.log(i);
    if(i>=0){
    this.setState({displaypopup:{display:"block"}});
    this.setState({singleImageurl:this.state.data[i].urls.small});
    this.setState({currentPopupIndex:i})
    document.getElementById("container").style.display="none";
    }
  };
  isBottom(el) {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    if (this.isBottom(wrappedElement)) {
      console.log('header bottom reached');
        fetch(`https://api.unsplash.com/photos/random/?client_id=LfEbYd2gWuOhsGnsDH3NqyTmv59ygVkTYL2OA-ee__s&count=10`)
      .then(function(response) {
        return response.json();
      })
      .then(result => {
        let data =this.state.data
      console.log(this.state, data)

        result =data.concat(result);
       this.setState({
          data: result
        });

      });
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };
  close = ()=>{
    this.setState({displaypopup:{display:"none"}});
    document.getElementById("container").style.display="block"
  }
  render() {
    let data = [...this.state.data];
  return (
    <div className="App">
      <div className="popup" style ={this.state.displaypopup}>
        <button onClick={()=>this.close()} id="close">&#142;</button>
        <div id="img-container">
        
        <button id="next-Btn" onClick={()=> this.handleClick(this.state.currentPopupIndex-1)}>&#134;</button>
        
        <img src={this.state.singleImageurl} alt="photo"/>
        <button id="next-Btn" onClick={()=> this.handleClick(this.state.currentPopupIndex+1)}>&#135;</button>
        </div>
        </div>
      <div id="container">
    {data.map((element,index )=> {
         
          //console.log(element);
          return (
          <img src={element.urls.thumb} alt="photos" key ={element.id} onClick={()=> this.handleClick(index)}/>
          );
        })}
    </div>
    </div>
  );
    }
}

export default App;
