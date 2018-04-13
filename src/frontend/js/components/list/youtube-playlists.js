import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';

import {
    Button,
    Loader,
    Grid,
    Segment
} from 'semantic-ui-react';


import { UI_STATE } from 'constants/ui-state';
import {
    youtubePlaylistsGet,
    youtubePlaylistsOrder
} from 'actions/youtube-playlists';

import YoutubePlaylistCard from 'components/card/youtube-playlist-card';

class YoutubePlaylists extends React.Component {
    componentWillMount() {
        const { youtubePlaylistsGet } = this.props;
        youtubePlaylistsGet();
    }
    render() {
        const { models, orderBy, setFilterOrderBy, youtubePlaylistsGet, ui_state } = this.props;

        let modelsSorted = models;
        if (orderBy == 'date_published')
            modelsSorted = _.sortBy(models, [(playlist) => { return playlist.snippet.publishedAt }]);

        if (orderBy == 'title')
            modelsSorted = _.sortBy(models, [(playlist) => { return playlist.snippet.title.toUpperCase() }]);

        if (orderBy == 'videos')
            modelsSorted = _.sortBy(models, [(playlist) => { return playlist.contentDetails.itemCount }]).reverse();



        const nodes = modelsSorted.map(function(playlist, i){
            return (
                <Grid.Column key={ i } >
                    <YoutubePlaylistCard playlist={ playlist } />
                </Grid.Column>
            );
        });
        return (
            <div>
                <Segment>
                    <Grid>
                        <Grid.Column width={ 1 } >
                            Order by:
                        </Grid.Column>
                        <Grid.Column width={ 4 } >
                            <Button.Group size='small' compact basic>
                                <Button content='Title' active={ orderBy=='title' } onClick={ ()=> { setFilterOrderBy('title') } } />
                                <Button content='Video Count' active={ orderBy=='videos' } onClick={ ()=> { setFilterOrderBy('videos') } } />
                                <Button content='Date Published' active={ orderBy=='date_published' } onClick={ ()=> { setFilterOrderBy('date_published') } } />
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column width={ 11 } textAlign='right'>
                            <Button content='Refresh' onClick={ ()=> { youtubePlaylistsGet() } } color='blue' size='small' icon='refresh' labelPosition='right'  loading={ui_state == UI_STATE.REQUESTING}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment loading={ui_state == UI_STATE.REQUESTING} basic>
                    <Grid columns={ 8 }>
                        { nodes }
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { ui_state, errors, models, orderBy } = state.youtubePlaylistsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models,
        orderBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        youtubePlaylistsGet: () => {
            dispatch(youtubePlaylistsGet());
        },
        setFilterOrderBy: (orderBy) => {
            dispatch(youtubePlaylistsOrder(orderBy));
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(YoutubePlaylists);