import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';


class TrackList extends Component{
  render(){
    return(
      <div className="TrackList">
      {this.props.tracks.map((trackItem)=>{
          return <Track track={trackItem} onAdd={this.props.onAdd} onRemove={this.props.onRemove} key={trackItem.id}/>
        })}
      </div>
    );
  }
}

export default TrackList;
