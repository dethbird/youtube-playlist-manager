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


class YoutubePlaylistCard extends React.Component {
    render() {
        const { playlist, history } = this.props;
        let statusIcon = 'world';

        if (playlist.status.privacyStatus=='private')
            statusIcon = 'lock';
        if (playlist.status.privacyStatus=='unlisted')
            statusIcon = 'hide';
        return (
            <Card >
                <Image src={ playlist.snippet.thumbnails.high.url } />
                <Card.Content>
                    <Card.Header>
                        { playlist.snippet.title }
                    </Card.Header>
                    <Card.Meta>
                        { moment(playlist.snippet.publishedAt).format('MMMM Do YYYY') }
                    </Card.Meta>
                    <Card.Meta>
                        <Button
                            icon='list layout'
                            onClick={ () => { history.push(`/playlist/${playlist.id}`) } }
                            title='Details'
                            size='mini'
                            basic
                            fluid
                        />
                        <Button
                            icon={ {
                                name: 'youtube square',
                                color: 'red'
                            } }
                            onClick={ () => { window.open(`https://www.youtube.com/playlist?list=${playlist.id}&disable_polymer=true`, '_blank') } }
                            title='Manage on Youtube'
                            size='mini'
                            basic
                            fluid
                        />
                    </Card.Meta>
                </Card.Content>
                <br />
                <Label icon={ statusIcon } attached='bottom left' size='mini'/>
                <Label content={ playlist.contentDetails.itemCount } size='mini' attached='top right' color='blue'/>
            </Card>
        )
    }
}

YoutubePlaylistCard.propTypes = {
    playlist: PropTypes.object
};

export default withRouter(YoutubePlaylistCard);