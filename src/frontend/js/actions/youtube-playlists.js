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
            .then((res) => {
                dispatch(youtubePlaylistsRequestSuccess(res.body));
            })
            .catch(() => {
                document.location='/logout';
            });
    };

export const youtubePlaylistsOrder = (orderBy) => {
    return {
        type: YOUTUBE_PLAYLISTS.ORDER_BY,
        orderBy
    }
}

export const youtubePlaylistsFilterString = (filterString) => {
    return {
        type: YOUTUBE_PLAYLISTS.SET_FILTER_STRING,
        filterString
    }
}

export const youtubePlaylistsSetOperatee = (operateePlaylist) => {
    return {
        type: YOUTUBE_PLAYLISTS.SET_OPERATEE,
        operateePlaylist
    }
}