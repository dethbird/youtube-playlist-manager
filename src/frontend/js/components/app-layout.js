import React from 'react';
import { withRouter } from 'react-router';

import {
    Button,
    Container,
    Grid,
    Segment,
    Image
} from 'semantic-ui-react';

class AppLayout extends React.Component {
    render() {
        const { children, history } = this.props;
        if (!securityContext) {
            return (
                <Segment textAlign='center' padded basic>
                    <Button content='Login with YouTube' onClick={()=>{ document.location='/service/google/authorize' }} color='youtube' icon='youtube' labelPosition='right'/>
                </Segment>
            );
        }
        return (
            <div>
                <Segment basic>
                    <Grid>
                        <Grid.Column width={ 12 } textAlign='left'>
                            <Button
                                basic
                                icon={{
                                    name: 'home',
                                    color: 'blue'
                                }}
                                onClick={()=>{ history.push('/') }}
                                title='My Playlists'
                            />
                            <Button
                                basic
                                icon={{
                                    name: 'shutdown'
                                }}
                                onClick={()=>{ document.location='/logout' }}
                                title='Logout'
                            />
                            <Image src={ securityContext.image.url } avatar />
                            <span>{ securityContext.displayName }</span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment textAlign='left' basic>
                    { children }
                </Segment>
            </div>
        );
    }
}

export default withRouter(AppLayout);