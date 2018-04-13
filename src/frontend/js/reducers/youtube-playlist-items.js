import { YOUTUBE_PLAYLIST_ITEMS } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubePlaylistItemsReducer = (state = {
    orderBy: 'title',
    filterString: null,
    models: [],
    ui_state: UI_STATE.SUCCESS,
    errors: []
}, action) => {

    switch (action.type) {
        case YOUTUBE_PLAYLIST_ITEMS.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_PLAYLIST_ITEMS.ERROR:
            return {
                ... state,
                ui_state: UI_STATE.ERROR,
                errors: action.errors
            }
        case YOUTUBE_PLAYLIST_ITEMS.SUCCESS:
            return {
                ... state,
                ui_state: UI_STATE.SUCCESS,
                models: action.models
            }
        case YOUTUBE_PLAYLIST_ITEMS.ORDER_BY:
            return {
                ... state,
                orderBy: action.orderBy
            }
        case YOUTUBE_PLAYLIST_ITEMS.SET_FILTER_STRING:
            return {
                ... state,
                filterString: action.filterString
            }
        default:
            return state;
    }
}

export default youtubePlaylistItemsReducer;