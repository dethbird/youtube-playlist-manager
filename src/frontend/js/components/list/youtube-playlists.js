import React from 'react';
import { connect } from 'react-redux';

import {
    Loader,
    Grid
} from 'semantic-ui-react';


import { UI_STATE } from 'constants/ui-state';
import { youtubePlaylistsGet } from 'actions/youtube-playlists';

import YoutubePlaylistCard from 'components/card/youtube-playlist-card';

class YoutubePlaylists extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(youtubePlaylistsGet());
    }
    render() {
        const { models } = this.props;
        const nodes = models ? models.map(function(playlist, i){
            return (
                <Grid.Column key={ i } >
                    <YoutubePlaylistCard playlist={ playlist } />
                </Grid.Column>
            );
        }) : <Loader active />;
        return (
            <Grid columns={ 8 }>
                { nodes }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.youtubePlaylistsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(YoutubePlaylists);