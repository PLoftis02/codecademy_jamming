import React, {Component} from 'react';
import './Track.css';

class Track extends Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  previewAction(){
    if(this.props.track.preview){
      return <audio controls> <source src={this.props.track.preview} type="audio/mpeg" /></audio>
    }else{
      return <a className="Preview-action"> No Preview Avail. </a>;
    }
  }

  renderAction(){
    if(this.props.track.isRemoval){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }else{
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }



  render(){
    return(
      <div className="Track">
      <div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
        <p>
        {this.previewAction()}
        {this.renderAction()}
        </p>
    </div>
    );
  }
}
export default Track;
