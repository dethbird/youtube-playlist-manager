import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import URL from 'url-parse';


import {
    Button,
    Header,
    Modal,
    Input,
    Segment
} from 'semantic-ui-react';

import {
    youtubeVideoGet,
    youtubeVideoReset
} from 'actions/youtube-video';
import {
    youtubePlaylistItemAdd
} from 'actions/youtube-playlist-item';
import {
    youtubePlaylistItemAddModalSetOpen
} from 'actions/youtube-playlist-item';

import { UI_STATE } from 'constants/ui-state';

class AddPlaylistItemModal extends React.Component {
    render() {
        const {
            ui_state,
            addYoutubeVideo,
            getYoutubeVideo,
            closeModal,
            model,
            modalOpen,
            playlistId
        } = this.props;

        const renderContent = (model) => {
            if (!model)
                return (
                    <Input
                        fluid
                        placeholder='https://www.youtube.com/watch?v=XXXXXXXX'
                        onChange={ (e, el) => { getYoutubeVideo(el.value) }}
                    />
                );
            return (
                <div>
                    <Header>{model.snippet.title}</Header>
                    <Segment basic dangerouslySetInnerHTML={{ __html: model.player.embedHtml }} />
                </div>
            )
        }

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
    const { modalOpen } = state.youtubePlaylistItemReducer;
    const { ui_state, errors, model } = state.youtubeVideoReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model,
        modalOpen
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
            dispatch(youtubePlaylistItemAdd(video, playlistId));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaylistItemModal);