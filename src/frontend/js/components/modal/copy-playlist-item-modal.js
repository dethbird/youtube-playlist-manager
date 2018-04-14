import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Modal
} from 'semantic-ui-react';

import {
    youtubePlaylistItemCopy
} from 'actions/youtube-playlist-item';
import {
    youtubePlaylistItemCopyModalSetOpen
} from 'actions/youtube-playlist-item';

import { UI_STATE } from 'constants/ui-state';

class CopyPlaylistItemModal extends React.Component {
    render() {
        const {
            ui_state,
            copyModalOpen,
            copyPlaylistItem,
            copyYoutubePlaylistItem,
            closeModal
        } = this.props;

        return (
            <Modal
                open={ copyModalOpen }
                closeIcon={{ name: 'window close', size: 'large'}}
                onClose={ () => { closeModal() } }
            >
                <Modal.Header>Select a playlist to copy to</Modal.Header>
                <Modal.Content>
                    farts
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        icon='copy'
                        labelPosition='right'
                        content='Copy to Playlist'
                        disabled={ true }
                        loading={ ui_state == UI_STATE.REQUESTING }
                        color='green'
                        onClick={ () => {
                            if (false) {
                                copyYoutubePlaylistItem(copyPlaylistItem)
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
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        copyModalOpen,
        copyPlaylistItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch(youtubePlaylistItemCopyModalSetOpen(false));
        },
        copyYoutubePlaylistItem: (copyPlaylistItem) => {
            console.log(copyPlaylistItem)
            // dispatch(youtubePlaylistItemCopy( copyPlaylistItem ));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CopyPlaylistItemModal);