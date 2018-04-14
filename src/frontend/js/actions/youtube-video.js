import request from 'superagent';
import { YOUTUBE_VIDEO } from 'constants/actions';


const youtubeVideoRequestInit = () => {
    return {
        type: YOUTUBE_VIDEO.REQUEST
    }
}

const youtubeVideoRequestSuccess = (model) => {
    return {
        type: YOUTUBE_VIDEO.SUCCESS,
        model
    }
}

const youtubeVideoRequestError = (errors) => {
    return {
        type: YOUTUBE_VIDEO.ERROR,
        errors
    }
}

export const youtubeVideoGet = (videoId) =>
    dispatch => {
        dispatch(youtubeVideoRequestInit());
        request.get(`/service/google/youtube-video/${videoId}`)
            .then((res) => {
                dispatch(youtubeVideoRequestSuccess(res.body));
            })
            .catch((err) => {
                dispatch(youtubeVideoRequestError(err));
            });
    };

export const youtubeVideoReset = (errors) => {
        return {
            type: YOUTUBE_VIDEO.RESET
        }
    }