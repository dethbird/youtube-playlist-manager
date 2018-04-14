import { YOUTUBE_PLAYLISTS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubePlaylistsReducer = (state = {
    orderBy: 'title',
    filterString: null,
    models: [],
    ui_state: UI_STATE.SUCCESS,
    errors: [],
    operateePlaylist: undefined
}, action) => {

    switch (action.type) {
        case YOUTUBE_PLAYLISTS.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_PLAYLISTS.ERROR:
            return {
                ... state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case YOUTUBE_PLAYLISTS.SUCCESS:
            return {
                ... state,
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        case YOUTUBE_PLAYLISTS.ORDER_BY:
            return {
                ... state,
                orderBy: action.orderBy
            }
        case YOUTUBE_PLAYLISTS.SET_FILTER_STRING:
            return {
                ... state,
                filterString: action.filterString
            }
        case YOUTUBE_PLAYLISTS.SET_OPERATEE:
            return {
                ... state,
                operateePlaylist: action.operateePlaylist
            }
        default:
            return state;
    }
}

export default youtubePlaylistsReducer;