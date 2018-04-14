import request from 'superagent';
import { YOUTUBE_PLAYLIST_ITEM } from 'constants/actions';


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
            })
            .catch((err) => {
                youtubePlaylistItemRequestError(err);
            });
    };