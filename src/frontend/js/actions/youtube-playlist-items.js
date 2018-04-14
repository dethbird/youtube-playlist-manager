import request from 'superagent';
import { YOUTUBE_PLAYLIST_ITEMS } from 'constants/actions';


const youtubePlaylistItemsRequestInit = () => {
    return {
        type: YOUTUBE_PLAYLIST_ITEMS.REQUEST
    }
}

const youtubePlaylistItemsRequestSuccess = (models) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEMS.SUCCESS,
        models
    }
}

const youtubePlaylistItemsRequestError = (errors) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEMS.ERROR,
        errors
    }
}

export const youtubePlaylistItemsGet = (playlistId) =>
    dispatch => {
        dispatch(youtubePlaylistItemsRequestInit());
        request.get(`/service/google/youtube-playlist-items/${playlistId}`)
            .then((res) => {
                dispatch(youtubePlaylistItemsRequestSuccess(res.body));
            })
            .catch(() => {
                document.location='/logout';
            });
    };

export const youtubePlaylistItemsOrder = (orderBy) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEMS.ORDER_BY,
        orderBy
    }
}

export const youtubePlaylistItemsFilterString = (filterString) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEMS.SET_FILTER_STRING,
        filterString
    }
}
