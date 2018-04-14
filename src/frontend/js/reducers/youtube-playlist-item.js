import { YOUTUBE_PLAYLIST_ITEM } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubePlaylistItemReducer = (state = {
    model: undefined,
    ui_state: UI_STATE.SUCCESS,
    errors: [],
    modalOpen: false,
    deleteConfirmOpen: false,
    deletePlaylistItem: undefined
}, action) => {

    switch (action.type) {
        case YOUTUBE_PLAYLIST_ITEM.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_PLAYLIST_ITEM.ERROR:
            return {
                ... state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case YOUTUBE_PLAYLIST_ITEM.SUCCESS:
            return {
                ... state,
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        case YOUTUBE_PLAYLIST_ITEM.SET_MODAL_OPEN:
            return {
                ... state,
                modalOpen: action.modalOpen
            }
        case YOUTUBE_PLAYLIST_ITEM.SET_DELETE_CONFIRM_OPEN:
            return {
                ... state,
                deleteConfirmOpen: action.deleteConfirmOpen,
                deletePlaylistItem: action.deletePlaylistItem
            }
        default:
            return state;
    }
}

export default youtubePlaylistItemReducer;