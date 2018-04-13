import React from 'react';

import YoutubePlaylistItems from 'components/list/youtube-playlist-items';

class Playlist extends React.Component {
    render() {
        const { match } = this.props;
        return <YoutubePlaylistItems playlistId={ match.params.playlistId }/>
    }
}

export default Playlist;