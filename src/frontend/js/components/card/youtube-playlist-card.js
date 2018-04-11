import React from 'react';
import {
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
    Card,
    Image,
    Label
} from 'semantic-ui-react';


class YoutubePlaylistCard extends React.Component {
    render() {
        const { playlist } = this.props;
        return (
            <Card onClick={ () => { window.open(`https://www.youtube.com/playlist?list=${playlist.id}&disable_polymer=true`, "_blank") } }>
                <Image src={ playlist.snippet.thumbnails.high.url } />
                <Label content={ playlist.contentDetails.itemCount } size='mini' attached='top right' color='blue'/>
                <Card.Content>
                    <Card.Header>
                        { playlist.snippet.title }
                    </Card.Header>
                    <Card.Meta>
                        { moment(playlist.snippet.publishedAt).format('MMMM Do YYYY') }
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

YoutubePlaylistCard.propTypes = {
    playlist: PropTypes.object
};

export default YoutubePlaylistCard;