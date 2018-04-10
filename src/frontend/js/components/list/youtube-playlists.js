import React from 'react';
import { connect } from 'react-redux';

import {
    Loader
} from 'semantic-ui-react';


import { UI_STATE } from 'constants/ui-state';
import { youtubePlaylistsGet } from 'actions/youtube-playlists';

class YoutubePlaylists extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(youtubePlaylistsGet());
    }
    render() {
        const { models } = this.props;
        const nodes = models ? models.map(function(playlist, i){
            return (
                <div key={ i }>{ playlist }</div>
            );
        }) : <Loader active />;
        return <div>{ nodes }</div>
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