import request from 'superagent';
import { YOUTUBE_PLAYLIST } from 'constants/actions';


const youtubePlaylistRequestInit = () => {
    return {
        type: YOUTUBE_PLAYLIST.REQUEST
    }
}

const youtubePlaylistRequestSuccess = (model) => {
    return {
        type: YOUTUBE_PLAYLIST.SUCCESS,
        model
    }
}

const youtubePlaylistRequestError = (errors) => {
    return {
        type: YOUTUBE_PLAYLIST.ERROR,
        errors
    }
}

export const youtubePlaylistGet = (playlistId) =>
    dispatch => {

        dispatch(youtubePlaylistRequestInit());
        request.get(`/service/google/youtube-playlist/${playlistId}`)
            .then((res) => {
                dispatch(youtubePlaylistRequestSuccess(res.body));
            })
            .catch(() => {
                document.location='/logout';
            });
    };