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

class DeletePlaylistItemConfirm extends React.Component {
    render() {
        const {
            ui_state,
            deleteConfirmOpen,
            deletePlaylistItem,
            deleteYoutubePlaylistItem,
            cancelConfirm
        } = this.props;

        return (
            <Confirm
                header='Confirm playlist item delete'
                content='Remove this item from this playlist?'
                open={ deleteConfirmOpen }
                onCancel={ cancelConfirm }
                onConfirm={ () => { deleteYoutubePlaylistItem(deletePlaylistItem) } }
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { deleteConfirmOpen, deletePlaylistItem, ui_state } = state.youtubePlaylistItemReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        deleteConfirmOpen,
        deletePlaylistItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cancelConfirm: () => {
            dispatch(youtubePlaylistItemDeleteConfirmSetOpen(false));
        },
        deleteYoutubePlaylistItem: (deletePlaylistItem ) => {
            dispatch(youtubePlaylistItemDelete( deletePlaylistItem ));
        },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlaylistItemConfirm);