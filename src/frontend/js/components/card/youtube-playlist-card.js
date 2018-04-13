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
                    <Card.Meta textAlign='right'>
                        <Button
                            icon='list layout'
                            onClick={ () => { history.push(`/playlist/${playlist.id}`) } }
                            size='mini'
                            color='youtube'
                            basic
                            title='Details'
                        />
                        <Button
                            icon='youtube square'
                            onClick={ () => { window.open(`https://www.youtube.com/playlist?list=${playlist.id}&disable_polymer=true`, "_blank") } }
                            size='mini'
                            basic
                            title='Manage on Youtube'
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