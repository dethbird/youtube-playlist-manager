import { YOUTUBE_PLAYLIST } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubePlaylistReducer = (state = {
    models: [],
    ui_state: UI_STATE.SUCCESS,
    errors: []
}, action) => {

    switch (action.type) {
        case YOUTUBE_PLAYLIST.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_PLAYLIST.ERROR:
            return {
                ... state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case YOUTUBE_PLAYLIST.SUCCESS:
            return {
                ... state,
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        default:
            return state;
    }
}

export default youtubePlaylistReducer;