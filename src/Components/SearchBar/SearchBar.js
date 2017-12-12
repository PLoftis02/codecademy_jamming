import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      term: ' '
    };
    this.search = this.search.bind(this);
    this.handleTermChange=this.handleTermChange.bind(this);
  }

  search(e){
    this.props.onSearch(this.state.term);
  }


  handleTermChange(event){
    this.setState({
      term: event.target.value
    })
  }

  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={(e)=>e.keyCode===13 ? this.search():0}/>
        <a onClick={this.search} >SEARCH</a>
      </div>
    );
  }
}


export default SearchBar;
