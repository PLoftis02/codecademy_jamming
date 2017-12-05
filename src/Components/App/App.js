import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

const defaultState = {
  searchResults: [
    {
      id: '0FVNtH31j9ToHycO6I6Ari',
      name: 'Mount Sinai',
      artist: '$uicideBoy$',
      album: 'Songsthatwewontgetsuedforbutattheendofthedayweallgonnadieanyway',
      uri: 'spotify:track:0FVNtH31j9ToHycO6I6Ari',
      isRemoval: false
    }
  ],
  playlistName: 'New Playlist',
  playlistTracks: [
    {
      id: "3I1Pk90V4q0wtwDK6OULIe",
      name:'Face It',
      artist: '$uicideBoy$',
      album: 'Kill Yourself XVII: The Suburban Sacrifice Saga',
      uri: "spotify:track:3I1Pk90V4q0wtwDK6OULIe",
      isRemoval: true
    }
  ]
};


class App extends Component{
  constructor(props){
    super(props);
    this.state = defaultState;
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist  = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  addTrack(track){
    if(this.state.playlistTracks.find( t => t.id === track.id)){
      return;
    }else{
      track.isRemoval = true;
      this.setState({
        playlistTracks:this.state.playlistTracks.concat(track),
        searchResults: this.state.searchResults.filter(t=>t.id !== track.id)
      })
    }
  }

  removeTrack(track){
    track.isRemoval = false;
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(t=>t.id !== track.id),
      searchResults: this.state.searchResults.concat(track)
    })
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);  //should rip all URIs from the playlist trackURIs
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=>{
      this.setState(defaultState);
    });
  }

  search(searchTerm){
    if(Spotify.getAccessToken()){
        Spotify.search(searchTerm).then(tracks =>{
            this.setState({
              searchResults: tracks
            });
        });
    }
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
