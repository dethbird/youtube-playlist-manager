import { YOUTUBE_VIDEO } from 'constants/actions';
import { UI_STATE } from 'constants/ui-state';

const youtubeVideoReducer = (state = {
    model: undefined,
    ui_state: UI_STATE.SUCCESS,
    errors: []
}, action) => {

    switch (action.type) {
        case YOUTUBE_VIDEO.REQUEST:
            return {
                ... state,
                ui_state: UI_STATE.REQUESTING
            }
        case YOUTUBE_VIDEO.ERROR:
            return {
                ... state,
                ui_state: UI_STATE.ERROR,
                model: undefined,
                errors: action.errors
            }
        case YOUTUBE_VIDEO.SUCCESS:
            return {
                ... state,
                ui_state: UI_STATE.SUCCESS,
                model: action.model
            }
        case YOUTUBE_VIDEO.RESET:
            return {
                ui_state: UI_STATE.SUCCESS,
                model: undefined,
                errors: []
            }
        default:
            return state;
    }
}

export default youtubeVideoReducer;