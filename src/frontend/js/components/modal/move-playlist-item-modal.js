import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Item,
    Modal
} from 'semantic-ui-react';

import {
    youtubePlaylistItemMove,
    youtubePlaylistItemMoveModalSetOpen
} from 'actions/youtube-playlist-item';
import {
    youtubePlaylistsSetOperatee
} from 'actions/youtube-playlists';

import PlaylistSelect from 'components/form/select/playlist-select';
import { UI_STATE } from 'constants/ui-state';

class MovePlaylistItemModal extends React.Component {
    render() {
        const {
            ui_state,
            moveModalOpen,
            movePlaylistItem,
            moveYoutubePlaylistItem,
            closeModal,
            operateePlaylist
        } = this.props;

        return (
            <Modal
                open={ moveModalOpen }
                closeIcon={{ name: 'window close', size: 'large'}}
                onClose={ () => { closeModal() } }
                closeOnDimmerClick={ false }
            >
                <Modal.Header>Select a playlist to move to</Modal.Header>
                <Modal.Content>
                    {
                        operateePlaylist
                        ? (
                            <Item>
                                <Item.Image rounded size='small' src={operateePlaylist.snippet.thumbnails.high.url} />
                                <Item.Content>
                                    <Item.Header>{ operateePlaylist.snippet.title }</Item.Header>
                                </Item.Content>
                            </Item>
                        )
                        : <PlaylistSelect />}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        icon='move'
                        labelPosition='right'
                        content='Move to Playlist'
                        disabled={ !operateePlaylist }
                        loading={ ui_state == UI_STATE.REQUESTING }
                        color='green'
                        onClick={ () => {
                            if (operateePlaylist) {
                                moveYoutubePlaylistItem(movePlaylistItem, operateePlaylist.id)
                            }
                        } }
                    />
                </Modal.Actions>

            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const { moveModalOpen, movePlaylistItem, ui_state } = state.youtubePlaylistItemReducer;
    const { operateePlaylist } = state.youtubePlaylistsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        moveModalOpen,
        movePlaylistItem,
        operateePlaylist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch(youtubePlaylistItemMoveModalSetOpen(false));
            dispatch(youtubePlaylistsSetOperatee(undefined));
        },
        moveYoutubePlaylistItem: (movePlaylistItem, moveToPlaylistId) => {
            dispatch(youtubePlaylistItemMove( movePlaylistItem, moveToPlaylistId ));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MovePlaylistItemModal);