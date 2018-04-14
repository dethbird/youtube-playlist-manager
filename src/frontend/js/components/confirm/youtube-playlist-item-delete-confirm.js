import React from 'react';
import { connect } from 'react-redux';


import {
    Confirm
} from 'semantic-ui-react';

import {
    youtubePlaylistItemDelete
} from 'actions/youtube-playlist-item';
import {
    youtubePlaylistItemDeleteConfirmSetOpen
} from 'actions/youtube-playlist-item';

import { UI_STATE } from 'constants/ui-state';

class  extends React.Component {
    render() {
        const {
            ui_state,
            deleteConfirmOpen,
            deletePlaylistItem
        } = this.props;

        return (
            <Modal
                open={ modalOpen }
                closeIcon={{ name: 'window close', size: 'large'}}
                onClose={ () => { closeModal() } }
            >
                <Modal.Header>Enter a Youtube Video URL</Modal.Header>
                <Modal.Content>
                    { renderContent(model) }
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        icon='add'
                        labelPosition='right'
                        content='Add to Playlist'
                        disabled={ !model }
                        loading={ ui_state == UI_STATE.REQUESTING }
                        color='green'
                        onClick={ () => {
                            if (model) {
                                addYoutubeVideo(model, playlistId)
                            }
                        } }
                    />
                </Modal.Actions>

            </Modal>
        );
    }
}

AddPlaylistItemModal.propTypes = {
    playlistId: PropTypes.string
};

const mapStateToProps = (state) => {
    const { deleteConfirmOpen, deletePlaylistItem } = state.youtubePlaylistItemReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        deleteConfirmOpen,
        deletePlaylistItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getYoutubeVideo: (videoUrl) => {
            const url = URL(videoUrl, true);
            if (url.query.hasOwnProperty('v'))
                dispatch(youtubeVideoGet(url.query.v));
        },
        closeModal: () => {
            dispatch(youtubeVideoReset());
            dispatch(youtubePlaylistItemAddModalSetOpen(false));
        },
        addYoutubeVideo: (video, playlistId) => {
            dispatch(youtubePlaylistItemDelete(video, playlistId));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaylistItemModal);