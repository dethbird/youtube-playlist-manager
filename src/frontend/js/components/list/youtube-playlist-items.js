import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import {
    Button,
    Loader,
    Grid,
    Input,
    Segment
} from 'semantic-ui-react';


import { UI_STATE } from 'constants/ui-state';
import {
    youtubePlaylistItemsGet,
    youtubePlaylistItemsOrder,
    youtubePlaylistItemsFilterString
} from 'actions/youtube-playlist-items';
import {
    youtubePlaylistGet
} from 'actions/youtube-playlist';
import {
    youtubePlaylistItemAddModalSetOpen,
    youtubePlaylistItemDeleteConfirmSetOpen
} from 'actions/youtube-playlist-item';

import YoutubePlaylistItemCard from 'components/card/youtube-playlist-item-card';
import AddPlaylistItemModal from 'components/modal/add-playlist-item-modal';
import DeletePlaylistItemConfirm from 'components/confirm/delete-playlist-item-confirm';

class YoutubePlaylistItems extends React.Component {
    componentWillMount() {
        const { playlistId, youtubePlaylistItemsGet, youtubePlaylistGet } = this.props;
        youtubePlaylistItemsGet(playlistId);
        youtubePlaylistGet(playlistId);
    }
    render() {
        const {
            playlistId,
            playlist,
            models,
            orderBy,
            filterString,
            setFilterString,
            setFilterOrderBy,
            youtubePlaylistItemsGet,
            youtubePlaylistItemAddModalSetOpen,
            handleClickDeletePlaylistItem,
            ui_state
        } = this.props;
        let modelsSorted = models;

        if (filterString) {
            modelsSorted = _.filter(modelsSorted, (playlistItem) => {
                return playlistItem.snippet.title.toUpperCase().includes(filterString.toUpperCase())
            });
        }

        if (orderBy == 'title')
            modelsSorted = _.sortBy(modelsSorted, [(playlistItem) => { return playlistItem.snippet.title.toUpperCase() }]);

        if (orderBy == 'videos')
            modelsSorted = _.sortBy(modelsSorted, [(playlistItem) => { return playlistItem.contentDetails.itemCount }]).reverse();



        const nodes = modelsSorted.map(function(playlistItem, i){
            return (
                <Grid.Column key={ i } >
                    <YoutubePlaylistItemCard
                        playlistItem={ playlistItem }
                        onClickDelete={ handleClickDeletePlaylistItem }
                    />
                </Grid.Column>
            );
        });
        return (
            <div>
                <Segment>
                    <h2>{ playlist ? playlist.snippet.title : ''}</h2>
                    <Grid>
                        <Grid.Column width={ 1 } >
                            Order by:
                        </Grid.Column>
                        <Grid.Column width={ 3 } >
                            <Button.Group size='small' compact basic>
                                <Button content='Title' active={ orderBy=='title' } onClick={ ()=> { setFilterOrderBy('title') } } />
                                <Button content='Date Published' active={ orderBy=='date_published' } onClick={ ()=> { setFilterOrderBy('date_published') } } />
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column width={ 6 } >
                            <Input
                                icon='filter'
                                placeholder='Filter...'
                                fluid
                                onChange={ (e, el) => { setFilterString(el.value) }}
                                value={ filterString || '' }
                            />
                        </Grid.Column>
                        <Grid.Column width={ 6 } textAlign='right'>
                            <Button icon='add' color='green' title="Add new video to this playlist" onClick={ () => { youtubePlaylistItemAddModalSetOpen(true) } } />
                            <Button content='Refresh' onClick={ ()=> { youtubePlaylistItemsGet(playlistId) } } color='blue' size='small' icon='refresh' labelPosition='right'  loading={ui_state == UI_STATE.REQUESTING}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment loading={ui_state == UI_STATE.REQUESTING} basic>
                    <Grid columns={ 8 }>
                        { nodes }
                    </Grid>
                </Segment>
                <DeletePlaylistItemConfirm />
                <AddPlaylistItemModal
                    playlistId={ playlistId }
                />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { ui_state, errors, models, orderBy, filterString } = state.youtubePlaylistItemsReducer;
    const { model } = state.youtubePlaylistReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models,
        orderBy,
        filterString,
        playlist: model
    }
}

function mapDispatchToProps(dispatch) {
    return {
        youtubePlaylistItemsGet: (playlistId) => {
            dispatch(youtubePlaylistItemsGet(playlistId));
        },
        youtubePlaylistItemAddModalSetOpen: (open) => {
            dispatch(youtubePlaylistItemAddModalSetOpen(open));
        },
        youtubePlaylistGet: (playlistId) => {
            dispatch(youtubePlaylistGet(playlistId));
        },
        setFilterOrderBy: (orderBy) => {
            dispatch(youtubePlaylistItemsOrder(orderBy));
        },
        setFilterString: (string) => {
            dispatch(youtubePlaylistItemsFilterString(string));
        },
        handleClickDeletePlaylistItem: (playlistItem) => {
            dispatch(youtubePlaylistItemDeleteConfirmSetOpen(true, playlistItem));
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(YoutubePlaylistItems);