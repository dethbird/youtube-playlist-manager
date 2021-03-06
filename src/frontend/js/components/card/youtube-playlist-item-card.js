import React from 'react';
import {
    Link
} from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Button,
    Card,
    Grid,
    Image,
    Label
} from 'semantic-ui-react';


class YoutubePlaylistItemCard extends React.Component {
    render() {
        const { playlistItem, history, onClickDelete, onClickCopy, onClickMove } = this.props;

        let statusIcon = 'world';
        if (playlistItem.status.privacyStatus=='private')
            statusIcon = 'lock';
        if (playlistItem.status.privacyStatus=='unlisted')
            statusIcon = 'hide';
        if (playlistItem.snippet.title.includes('Deleted video'))
            statusIcon = {
                name: 'remove circle',
                color: 'red'
            };
        return (
            <Card >
                <a onClick={ () => { window.open(`https://www.youtube.com/watch?v=${playlistItem.snippet.resourceId.videoId}`, '_blank') } } title="Watch on Youtube">
                    <Image
                        src={
                            playlistItem.snippet.hasOwnProperty('thumbnails')
                            ? playlistItem.snippet.thumbnails.high.url
                            : 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png'
                        }
                    />
                </a>
                <Card.Content>
                    <Card.Header>
                        { playlistItem.snippet.title }
                    </Card.Header>
                    <Card.Meta>
                        { moment(playlistItem.snippet.publishedAt).format('MMMM Do YYYY') }
                    </Card.Meta>
                    <Card.Meta>
                        <Button
                            icon={{
                                name: 'exchange'
                            }}
                            onClick={ () => { onClickMove(playlistItem) } }
                            title='Move to playlist ...'
                            basic
                            fluid
                            compact
                        />
                        <Button
                            icon={{
                                name: 'copy'
                            }}
                            onClick={ () => { onClickCopy(playlistItem) } }
                            title='Copy to playlist ...'
                            basic
                            fluid
                            compact
                        />
                        <Button
                            icon={{
                                name: 'trash'
                            }}
                            onClick={ () => { onClickDelete(playlistItem) } }
                            title='Delete'
                            basic
                            fluid
                            compact
                        />
                    </Card.Meta>
                </Card.Content>
                <br />
                <Label icon={ statusIcon } attached='bottom left' size='mini'/>
            </Card>
        )
    }
}

YoutubePlaylistItemCard.propTypes = {
    playlistItem: PropTypes.object,
    onClickDelete: PropTypes.func,
    onClickCopy: PropTypes.func,
    onClickMove: PropTypes.func
};

export default withRouter(YoutubePlaylistItemCard);