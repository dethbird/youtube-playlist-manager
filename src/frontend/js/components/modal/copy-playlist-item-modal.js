import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Item,
    Modal
} from 'semantic-ui-react';

import {
    youtubePlaylistItemCopy,
    youtubePlaylistItemCopyModalSetOpen
} from 'actions/youtube-playlist-item';
import {
    youtubePlaylistsSetOperatee
} from 'actions/youtube-playlists';

import PlaylistSelect from 'components/form/select/playlist-select';
import { UI_STATE } from 'constants/ui-state';

class CopyPlaylistItemModal extends React.Component {
    render() {
        const {
            ui_state,
            copyModalOpen,
            copyPlaylistItem,
            copyYoutubePlaylistItem,
            closeModal,
            operateePlaylist
        } = this.props;

        return (
            <Modal
                open={ copyModalOpen }
                closeIcon={{ name: 'window close', size: 'large'}}
                onClose={ () => { closeModal() } }
                closeOnDimmerClick={ false }
            >
                <Modal.Header>Select a playlist to copy to</Modal.Header>
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
                        icon='copy'
                        labelPosition='right'
                        content='Copy to Playlist'
                        disabled={ !operateePlaylist }
                        loading={ ui_state == UI_STATE.REQUESTING }
                        color='green'
                        onClick={ () => {
                            if (operateePlaylist) {
                                copyYoutubePlaylistItem(copyPlaylistItem, operateePlaylist.id)
                            }
                        } }
                    />
                </Modal.Actions>

            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const { copyModalOpen, copyPlaylistItem, ui_state } = state.youtubePlaylistItemReducer;
    const { operateePlaylist } = state.youtubePlaylistsReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        copyModalOpen,
        copyPlaylistItem,
        operateePlaylist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch(youtubePlaylistItemCopyModalSetOpen(false));
            dispatch(youtubePlaylistsSetOperatee(undefined));
        },
        copyYoutubePlaylistItem: (copyPlaylistItem, copyToPlaylistId) => {
            dispatch(youtubePlaylistItemCopy( copyPlaylistItem, copyToPlaylistId ));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CopyPlaylistItemModal);