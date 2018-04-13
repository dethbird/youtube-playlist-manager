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
        const { playlistItem, history } = this.props;
        let statusIcon = 'world';

        if (playlistItem.status.privacyStatus=='private')
            statusIcon = 'lock';
        if (playlistItem.status.privacyStatus=='unlisted')
            statusIcon = 'hide';
        return (
            <Card >
                <Image src={ playlistItem.snippet.thumbnails.high.url } />
                <Card.Content>
                    <Card.Header>
                        { playlistItem.snippet.title }
                    </Card.Header>
                    <Card.Meta>
                        { moment(playlistItem.snippet.publishedAt).format('MMMM Do YYYY') }
                    </Card.Meta>
                    <Card.Meta>
                        <Button
                            icon={ {
                                name: 'youtube square',
                                color: 'red'
                            } }
                            onClick={ () => { window.open(`https://www.youtube.com/playlistItem?list=${playlistItem.id}&disable_polymer=true`, '_blank') } }
                            title='Manage on Youtube'
                            size='mini'
                            basic
                            fluid
                        />
                        <Button
                            icon='list layout'
                            onClick={ () => { history.push(`/playlistItem/${playlistItem.id}`) } }
                            title='Details'
                            size='mini'
                            basic
                            fluid
                        />
                    </Card.Meta>
                </Card.Content>
                <br />
                <Label icon={ statusIcon } attached='bottom left' size='mini'/>
                <Label content={ playlistItem.contentDetails.itemCount } size='mini' attached='top right' color='blue'/>
            </Card>
        )
    }
}

YoutubePlaylistItemCard.propTypes = {
    playlistItem: PropTypes.object
};

export default withRouter(YoutubePlaylistItemCard);