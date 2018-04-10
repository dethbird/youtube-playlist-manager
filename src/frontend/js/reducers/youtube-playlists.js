import { YOUTUBE_PLAYLISTS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubePlaylistsReducer = (state = {}, action) => {

    switch (action.type) {
        case YOUTUBE_PLAYLISTS.REQUEST:
            return {
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_PLAYLISTS.ERROR:
            return {
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case YOUTUBE_PLAYLISTS.SUCCESS:
            return {
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        default:
            return state;
    }
}

export default youtubePlaylistsReducer;