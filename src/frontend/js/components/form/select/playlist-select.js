import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import {
    Button,
    Loader,
    Grid,
    Input,
    Image,
    List,
    Segment
} from 'semantic-ui-react';


import { UI_STATE } from 'constants/ui-state';
import {
    youtubePlaylistsGet,
    youtubePlaylistsOrder,
    youtubePlaylistsFilterString,
    youtubePlaylistsSetOperatee
} from 'actions/youtube-playlists';

import YoutubePlaylistCard from 'components/card/youtube-playlist-card';

class PlaylistSelect extends React.Component {
    componentWillMount() {
        const { youtubePlaylistsGet } = this.props;
        youtubePlaylistsGet();
    }
    render() {
        const {
            models,
            orderBy,
            filterString,
            setFilterString,
            setFilterOrderBy,
            youtubePlaylistsGet,
            handleSelectPlaylist,
            ui_state
        } = this.props;

        let modelsSorted = models;

        if (filterString) {
            modelsSorted = _.filter(modelsSorted, (playlist) => {
                return playlist.snippet.title.toUpperCase().includes(filterString.toUpperCase())
            });
        }

        if (orderBy == 'date_published')
            modelsSorted = _.sortBy(modelsSorted, [(playlist) => { return playlist.snippet.publishedAt }]);

        if (orderBy == 'title')
            modelsSorted = _.sortBy(modelsSorted, [(playlist) => { return playlist.snippet.title.toUpperCase() }]);

        if (orderBy == 'videos')
            modelsSorted = _.sortBy(modelsSorted, [(playlist) => { return playlist.contentDetails.itemCount }]).reverse();



        const nodes = modelsSorted.map(function(playlist, i){
            return (
                <List.Item key={ i } onClick={ () => { handleSelectPlaylist(playlist) } }>
                    <Image size='tiny' rounded src={ playlist.snippet.thumbnails.high.url } />
                    <List.Content>
                        <List.Header>{ playlist.snippet.title }</List.Header>
                    </List.Content>
                </List.Item>
            );
        });
        return (
            <div>
                <Segment>
                    <Grid>
                        <Grid.Column width={ 1 } >
                            Order by:
                        </Grid.Column>
                        <Grid.Column width={ 7 } >
                            <Button.Group size='small' compact basic>
                                <Button content='Title' active={ orderBy=='title' } onClick={ ()=> { setFilterOrderBy('title') } } />
                                <Button content='Video Count' active={ orderBy=='videos' } onClick={ ()=> { setFilterOrderBy('videos') } } />
                                <Button content='Date Published' active={ orderBy=='date_published' } onClick={ ()=> { setFilterOrderBy('date_published') } } />
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column width={ 8 } >
                            <Input
                                icon='filter'
                                placeholder='Filter...'
                                fluid
                                onChange={ (e, el) => { setFilterString(el.value) }}
                                value={ filterString || '' }
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment loading={ui_state == UI_STATE.REQUESTING} basic>
                    <List selection verticalAlign='middle' animated>
                        { nodes }
                    </List>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { ui_state, errors, models, orderBy, filterString } = state.youtubePlaylistsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models,
        orderBy,
        filterString
    }
}

function mapDispatchToProps(dispatch) {
    return {
        youtubePlaylistsGet: () => {
            dispatch(youtubePlaylistsGet());
        },
        handleSelectPlaylist: (playlist) => {
            dispatch(youtubePlaylistsSetOperatee(playlist));
        },
        setFilterOrderBy: (orderBy) => {
            dispatch(youtubePlaylistsOrder(orderBy));
        },
        setFilterString: (string) => {
            dispatch(youtubePlaylistsFilterString(string));
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSelect);