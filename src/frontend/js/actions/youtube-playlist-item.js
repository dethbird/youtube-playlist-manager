import request from 'superagent';
import { YOUTUBE_PLAYLIST_ITEM } from 'constants/actions';

import {
    youtubeVideoReset
} from 'actions/youtube-video';
import {
    youtubePlaylistItemsGet
} from 'actions/youtube-playlist-items';


const youtubePlaylistItemRequestInit = () => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.REQUEST
    }
}

const youtubePlaylistItemRequestSuccess = (model) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.SUCCESS,
        model
    }
}

const youtubePlaylistItemRequestError = (errors) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.ERROR,
        errors
    }
}

export const youtubePlaylistItemAdd = (video, playlistId) =>
    dispatch => {
        dispatch(youtubePlaylistItemRequestInit());
        request.post(`/service/google/youtube-playlist-item`)
            .query({
                part: 'snippet'
            })
            .send({
                snippet: {
                    playlistId,
                    resourceId: {
                        kind: video.kind,
                        videoId: video.id
                    }
                }
            })
            .then((res) => {
                dispatch(youtubePlaylistItemRequestSuccess(res.body));
                dispatch(youtubePlaylistItemAddModalSetOpen(false));
                dispatch(youtubeVideoReset());
                dispatch(youtubePlaylistItemsGet(playlistId));
            })
            .catch((err) => {
                youtubePlaylistItemRequestError(err);
            });
    };

export const youtubePlaylistItemDelete = (deletePlaylistItem) =>
    dispatch => {
        dispatch(youtubePlaylistItemRequestInit());
        request.delete(`/service/google/youtube-playlist-item/${deletePlaylistItem.id}`)
            .then((res) => {
                dispatch(youtubePlaylistItemDeleteConfirmSetOpen(false));
                dispatch(youtubePlaylistItemsGet(deletePlaylistItem.snippet.playlistId));
            })
            .catch((err) => {
                youtubePlaylistItemRequestError(err);
            });
    };

export const youtubePlaylistItemAddModalSetOpen = (modalOpen) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.SET_MODAL_OPEN,
        modalOpen
    }
}

export const youtubePlaylistItemDeleteConfirmSetOpen = (deleteConfirmOpen, deletePlaylistItem = undefined) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.SET_DELETE_CONFIRM_OPEN,
        deleteConfirmOpen,
        deletePlaylistItem
    }
}