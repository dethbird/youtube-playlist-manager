<?php

# service
$app->group('/service', function(){

    $this->group('/google', function(){

        $this->get('/authorize', function($request, $response, $args){
             $googleData = new GoogleClient(
                 $this->configs['application']['name'],
                APPLICATION_PATH . $this->configs['service']['google']['google_app_credentials_json']);

                return $response
                    ->withStatus(302)
                    ->withHeader('Location', $googleData->createAuthUrl());
        });

        $this->get('/redirect', function($request, $response, $args){
            $googleData = new GoogleClient(
                 $this->configs['application']['name'],
                APPLICATION_PATH . $this->configs['service']['google']['google_app_credentials_json']);

            $accessTokenData = $googleData->getAccessToken(
                $request->getQueryParam('code'));

            $googleData->setAccessToken($accessTokenData);

            $_SESSION['securityContext'] = $googleData->getUserBasicProfile();
            $_SESSION['authToken'] = $accessTokenData;

            return $response
                    ->withStatus(302)
                    ->withHeader('Location','/');

        });


        $this->get('/youtube-playlists', function($request, $response, $args){
            $googleData = new GoogleClient(
                 $this->configs['application']['name'],
                APPLICATION_PATH . $this->configs['service']['google']['google_app_credentials_json']);
            $googleData->setAccessToken($_SESSION['authToken']);

            $playlists = $googleData->getYoutubePlaylists();
            return $response
                ->withJson($playlists);

        });
    });
});
