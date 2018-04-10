import request from 'superagent';
import { YOUTUBE_PLAYLISTS } from 'constants/actions';


const youtubePlaylistsRequestInit = () => {
    return {
        type: YOUTUBE_PLAYLISTS.REQUEST
    }
}

const youtubePlaylistsRequestSuccess = (models) => {
    return {
        type: YOUTUBE_PLAYLISTS.SUCCESS,
        models
    }
}

const youtubePlaylistsRequestError = (errors) => {
    return {
        type: YOUTUBE_PLAYLISTS.ERROR,
        errors
    }
}

export const youtubePlaylistsGet = () =>
    dispatch => {

        dispatch(youtubePlaylistsRequestInit());
        request.get(`/service/google/youtube-playlists`)
            .end(function (err, res) {
                if (res.ok) {
                    dispatch(youtubePlaylistsRequestSuccess(res.body));
                } else {
                    dispatch(youtubePlaylistsRequestError(res.body));
                }
            });
    };

export const driveReset = () => {
    return {
        type: YOUTUBE_PLAYLISTS.RESET
    }
}