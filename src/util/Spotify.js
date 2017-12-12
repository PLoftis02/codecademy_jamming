let access_token = '';
let expires_in = '';

let clientID = 'f14b789e47ad4fc2a11966824d8df821';
let redirectUri ="http://bored-game.surge.sh/";
//let redirectUri ="http://localhost:3000/";



let Spotify = {
  savePlaylist(playlistName, playlistTracks){
      if(!playlistName || !playlistTracks){
        return false;
      }else{

        let default_accessToken = access_token;
        console.log("Access token :" + default_accessToken);
        let default_headers = {
          headers:{
            Authorization: `Bearer ${default_accessToken}`
          }
        };
        let default_userID = '';

      return fetch('https://api.spotify.com/v1/me', default_headers)
        .then(function(response){
          return response.json();
        }).then(function(jsonResponse){
          default_userID = jsonResponse.id;

          let options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${default_accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({"name":playlistName, "description": "Made with Jamming"})
          };

         fetch(`https://api.spotify.com/v1/users/${default_userID}/playlists`, options)
          .then(function(playlistResponse){
            return playlistResponse.json();
          }).then(function(jsonPlaylistResponse){
            let playlistId= jsonPlaylistResponse.id;
            let addTracksOptions={
                method: 'POST',
                headers:{
                  Authorization: `Bearer ${default_accessToken}`,
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({"uris":playlistTracks})
            };
            fetch(`https://api.spotify.com/v1/users/${default_userID}/playlists/${playlistId}/tracks`, addTracksOptions)
            .then(function(addTracksResponse){
              if(addTracksResponse.status === 201){
                console.log("Successfully Added to Your Spotify Account");
                return true;
              }else{
                console.log("We're sorry, something went wrong! " + addTracksResponse.status);
                return false;
              }
            });
          });
        });
      }
    },

  search(searchTerm){
    let searchOptions = {
      headers:{
        Authorization: `Bearer ${access_token}`
      }
    };
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, searchOptions)
    .then(function(response){
      return response.json();
    }).then(jsonResponse =>{
        return jsonResponse.tracks.items.map(track => {
          return{
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url
          }
        });
    });
  },

  getAccessToken(){
    if(access_token){
      return access_token;
    }else{
      //Pull info from Window location
      let currUrl = window.location + '';
      let accessToken= currUrl.match(/access_token=([^&]*)/);
      let expiresIn = currUrl.match(/expires_in=([^&]*)/);

      if(accessToken && expiresIn){
        //Set variables
        access_token = accessToken[1];
        expires_in = expiresIn[1];
        //set timeout to clear them
        window.setTimeout(() => access_token = '', expires_in * 1000);
        window.history.pushState('Access Token', null, '/');
        return access_token;
      }else{
        window.location.href=`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token&state=123`;
      }
    }

  }

};
export default Spotify;
