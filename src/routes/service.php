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

        $this->get('/drive_recent', function($request, $response, $args){
            global $googleData;
            $googleData = new GoogleClient(
                 $this->configs['application']['name'],
                APPLICATION_PATH . $this->configs['service']['google']['google_app_credentials_json']);
            $userGoogle = UserGoogle::find_by_user_id($_SESSION['securityContext']->id);
            $googleData->setAccessToken($userGoogle->access_token);

            $q = null;
            if ($request->getQueryParam('mediaType')=='image') {
                $q = "mimeType = 'image/jpeg' or mimeType = 'image/png'";
            } else if ($request->getQueryParam('mediaType')=='audio') {
                $q = "mimeType = 'audio/basic' or mimeType = 'audio/mpeg' or mimeType = 'audio/mp4' or mimeType = 'audio/x-aiff' or mimeType = 'audio/ogg' or mimeType = 'audio/vorbis'";
            }

            $files = $googleData->listFiles([
                'q' => $q,
                'fields' => "nextPageToken, files(id, name, thumbnailLink)",
                'pageSize' => 12
            ]);

            if ($request->getQueryParam('mediaType')=='image') {
                $files = array_map(function($item) {
                    global $googleData;
                    $item->thumbnailLink = $googleData->changeFileThumbnailSize( $item->thumbnailLink, 800 );
                    return $item;
                }, $files);
            }
            return $response->withJson($files);

        });

        $this->get('/drive_file/{id}', function($request, $response, $args){
            $googleData = new GoogleClient(
                 $this->configs['application']['name'],
                APPLICATION_PATH . $this->configs['service']['google']['google_app_credentials_json']);
            $userGoogle = UserGoogle::find_by_user_id($_SESSION['securityContext']->id);
            $googleData->setAccessToken($userGoogle->access_token);

            $file = $googleData->getFile($args['id']);
            return $response
                ->withJson($file);

        });
    });
});
