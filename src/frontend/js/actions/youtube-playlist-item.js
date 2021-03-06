import request from 'superagent';
import { YOUTUBE_PLAYLIST_ITEM } from 'constants/actions';

import {
    youtubeVideoReset
} from 'actions/youtube-video';
import {
    youtubePlaylistsSetOperatee
} from 'actions/youtube-playlists';

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
                dispatch(youtubePlaylistItemRequestSuccess(res.body));
                dispatch(youtubePlaylistItemDeleteConfirmSetOpen(false));
                dispatch(youtubePlaylistItemsGet(deletePlaylistItem.snippet.playlistId));
            })
            .catch((err) => {
                youtubePlaylistItemRequestError(err);
            });
    };

export const youtubePlaylistItemCopy = (copyPlaylistItem, playlistId) =>
    dispatch => {
        dispatch(youtubePlaylistItemRequestInit());
        request.put(`/service/google/youtube-playlist-item/copy-to-playlist`)
            .send({
                resourceId: copyPlaylistItem.snippet.resourceId,
                playlistId
            })
            .then((res) => {
                dispatch(youtubePlaylistItemRequestSuccess(res.body));
                dispatch(youtubePlaylistItemsGet(copyPlaylistItem.snippet.playlistId));
                dispatch(youtubePlaylistItemCopyModalSetOpen(false));
                dispatch(youtubePlaylistsSetOperatee(undefined));
            })
            .catch((err) => {
                youtubePlaylistItemRequestError(err);
            });
    };

export const youtubePlaylistItemMove = (movePlaylistItem, playlistId) =>
    dispatch => {
        dispatch(youtubePlaylistItemRequestInit());
        request.put(`/service/google/youtube-playlist-item/move-to-playlist`)
            .send({
                resourceId: movePlaylistItem.snippet.resourceId,
                playlistId,
                playlistItemId: movePlaylistItem.id
            })
            .then((res) => {
                dispatch(youtubePlaylistItemRequestSuccess(res.body));
                dispatch(youtubePlaylistItemsGet(movePlaylistItem.snippet.playlistId));
                dispatch(youtubePlaylistItemMoveModalSetOpen(false));
                dispatch(youtubePlaylistsSetOperatee(undefined));
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
export const youtubePlaylistItemCopyModalSetOpen = (copyModalOpen, copyPlaylistItem = undefined) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.SET_COPY_MODAL_OPEN,
        copyModalOpen,
        copyPlaylistItem
    }
}

export const youtubePlaylistItemMoveModalSetOpen = (moveModalOpen, movePlaylistItem = undefined) => {
    return {
        type: YOUTUBE_PLAYLIST_ITEM.SET_MOVE_MODAL_OPEN,
        moveModalOpen,
        movePlaylistItem
    }
}