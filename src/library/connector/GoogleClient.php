<?php
class GoogleClient {

    private $client;

    /**
     * Constructor.
     * @param string $applicationName name of the application.
     * @param string $authConfigFile  file location for the config json file.
     */
    public function __construct($applicationName, $authConfigFile)
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName($applicationName);
        $this->client->setAuthConfigFile($authConfigFile);
        $this->client->addScope('https://www.googleapis.com/auth/userinfo.profile');
        $this->client->addScope('https://www.googleapis.com/auth/youtube.force-ssl');
        // $this->client->setApprovalPrompt('force');
    }

    /**
     * Get the auth screen url
     * @return string the auth url
     */
    public function createAuthUrl()
    {
        return $this->client->createAuthUrl();
    }

    /**
     * Fetch an access token
     * @param  string $code The code GET param from the redirect
     * @return string       json representing auth token
     */
    public function getAccessToken($code)
    {
        $this->client->authenticate($code);
        return $this->client->getAccessToken();
    }

    /**
     * Is the access token expired?
     * @return boolean
     */
    public function isAccessTokenExpired()
    {
        return $this->client->isAccessTokenExpired();
    }

    /**
     * Set the auth token
     * @param string $accessToken the json encoded auth object from Google.
     */
    public function setAccessToken($accessToken)
    {
        $this->client->setAccessToken($accessToken);
    }

    /**
     * Get a new access token
     * @param  string $refreshToken Refresh token we got from the redirect
     * @return object               New auth token (without refresh token!)
     */
    public function refreshAccessToken($refreshToken)
    {
        $this->client->refreshToken($refreshToken);
        return $this->client->getAccessToken();
    }

    /** DRIVE **/

    /**
     * Get file list for an authenticated user
     * @link https://developers.google.com/drive/v3/reference/files/list
     *
     * @param  array  $options  options for the file list operation.
     * @return array            array of file objects as stdClass()
     */
    public function listFiles($options = [])
    {
        $data = [];
        $drive_service = new Google_Service_Drive($this->client);
        $files = $drive_service->files->listFiles($options);
        foreach ($files->getFiles() as $file) {
            $data[] = $file->toSimpleObject();
        }
        return $data;
    }

    /**
     * Get the full metadata for a file
     * @param  string $fileId The google file id to fetch for
     * @param  boolean $fileFolder Get the full folder path for the file
     * @return object         object representing the file
     */
    public function getFile($fileId, $fileFolder = false)
    {
        $drive_service = new Google_Service_Drive($this->client);
        $file = $drive_service->files->get($fileId, [
            'fields' => 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
        ]);

        $data = $file->toSimpleObject();
        if ($fileFolder) {
            $data->folder = $this->getFileFolder(null, $file);
        }
        return $data;
    }


    /**
     * Download the Google Drive file
     * @param  string $fileId The google file id to fetch for
     * @return string         contents of the file
     */
    public function downloadFile($fileId)
    {
        $drive_service = new Google_Service_Drive($this->client);
        $response = $drive_service->files->get($fileId, ['alt' => 'media'] );
        $body = $response->getBody();
        return $body;
    }


    /**
     * Upload a file to Google Drive
     * @param  string $filePath Local path to file
     * @param  string $fileName File name
     * @param  string $mimeType File Mime-Type
     * @param  string $folderId Google Drive folder id
     * @return string         response of the upload
     */
    public function uploadFile(
        $filePath,
        $fileName,
        $mimeType='application/octet-stream',
        $folderId = null
    )
    {
        $fileMetadata = new Google_Service_Drive_DriveFile([
            'name' =>$fileName,
            'parents' => [$folderId]
        ]);
        $drive_service = new Google_Service_Drive($this->client);
        return $drive_service->files->create($fileMetadata, [
            'data' => file_get_contents($filePath),
            'mimeType' => $mimeType,
            'uploadType' => 'multipart',
            'fields' => 'id'
        ]);
    }

    /**
     * Override the last value from Drive file.thumbnailLink
     * e.g.: "https://lh3.googleusercontent.com/d1Eg8ii_PxSgLd1TEvKlhprQDELNL-O_f6wNMEeqR0GULdG8-Q197lXAZHuHNg2WvHaT6v8BPMY=s220"
     * @param  string $thumbnailLink Original url
     * @param  integer $size
     * @return string         cache key
     */
    public function changeFileThumbnailSize($thumbnailLink, $size = 640)
    {
        return substr(
            $thumbnailLink,
            0,
            strrpos($thumbnailLink, '=')
        ) . '=s' . $size;
    }


    /**
     * Build the cache key string we will use to find and serve thumbnails
     * @param  object $fileObj simpleObject representation of file
     * @return string         cache key
     */
    public function getThumbnailCacheKey($file)
    {
        return $file->md5Checksum;
    }

    /**
     * Recursively climb up the parent folder chain
     * @param  [type] $folder the current folder
     * @param  [type] $file   Google Drive file class
     * @return [type]         another level up of the folder tree
     */
    public function getFileFolder($folder, $file)
    {
        if (count($file->getParents()) > 0){

            $drive_service = new Google_Service_Drive($this->client);

            $parents = $file->getParents();
            $parent = $parents[0];

            $file = $drive_service->files->get($parent, [
                'fields' => 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
            ]);

            $folder = "/" . $file->getName() . $folder;
            $folder = $this->getFileFolder($folder, $file);
        }
        return $folder;
    }


    /** PEOPLE */
    public function getUserBasicProfile()
    {
        $httpClient = $this->client->authorize();
        $response = $httpClient->get('https://www.googleapis.com/plus/v1/people/me');
        return json_decode($response->getBody()->getContents());
    }

    /** YOUTUBE **/
    public function getYoutubeChannels($part, $options)
    {
        $youtube_service = new Google_Service_YouTube($this->client);
        $channels = $youtube_service->channels->listChannels(
            $part, $options)->getItems();
        $data = [];
        foreach($channels as $channel){
            $data[] = $channel->toSimpleObject();
        }
        return $data;
    }

    public function getYoutubePlaylist($playlistId)
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->get('https://www.googleapis.com//youtube/v3/playlists', [
            'query' => [
                'id' => $playlistId,
                'part' => 'id,snippet,contentDetails,status'
            ]
        ]);
        if ($response->getStatusCode() != 200) {
            return new Response(
                $response->getStatusCode(),
                ['message' => 'Google session has expired']
            );
        }
        $data = json_decode($response->getBody()->getContents())->items[0];
        return new Response(
            $response->getStatusCode(),
            $data
        );
    }

    public function getYoutubePlaylists()
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->get('https://www.googleapis.com//youtube/v3/playlists', [
            'query' => [
                'part' => 'id,snippet,contentDetails,status',
                'mine' => 'true',
                'maxResults' => 50
            ]
        ]);
        if ($response->getStatusCode() != 200) {
            return new Response(
                $response->getStatusCode(),
                ['message' => 'Google session has expired']
            );
        }
        $data = json_decode($response->getBody()->getContents());
        $items = $data->items;
        if (isset($data->nextPageToken)) {
            $totalResults = $data->pageInfo->totalResults;
            $nextPageToken = $data->nextPageToken;
            while (count($items) < $totalResults) {
                $response = $httpClient->get('https://www.googleapis.com//youtube/v3/playlists', [
                    'query' => [
                        'part' => 'id,snippet,contentDetails,status',
                        'mine' => 'true',
                        'maxResults' => 50,
                        'pageToken' => $nextPageToken
                    ]
                ]);
                $data = json_decode($response->getBody()->getContents());
                $items = array_merge($items, $data->items);
                if (isset($data->nextPageToken)) {
                    $nextPageToken = $data->nextPageToken;
                } else {
                    $nextPageToken = null;
                }
            }
        }
        return new Response(
            $response->getStatusCode(),
            $items
        );
    }

    public function addYoutubePlaylistItem($playlistId, $resourceId)
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->post('https://www.googleapis.com//youtube/v3/playlistItems', [
            'query' => [
                'part' => 'snippet'
            ],
            'json' => [
                'snippet' => [
                    'playlistId' => $playlistId,
                    'resourceId' => $resourceId
                ]
            ]
        ]);
        if ($response->getStatusCode() != 200) {
            return new Response(
                $response->getStatusCode(),
                ['message' => 'Google session has expired']
            );
        }
        $data = json_decode($response->getBody()->getContents());
        return new Response(
            $response->getStatusCode(),
            $data
        );
    }

    public function deleteYoutubePlaylistItem($playlistItemId)
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->delete('https://www.googleapis.com//youtube/v3/playlistItems', [
            'query' => [
                'id' => $playlistItemId
            ]
        ]);
        if ($response->getStatusCode() != 200) {
            return new Response(
                $response->getStatusCode(),
                ['message' => 'Error deleting playlist item']
            );
        }
        $data = json_decode($response->getBody()->getContents());
        return new Response(
            $response->getStatusCode(),
            $data
        );
    }

    public function getYoutubePlaylistItems($playlistId)
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->get('https://www.googleapis.com//youtube/v3/playlistItems', [
            'query' => [
                'playlistId' => $playlistId,
                'part' => 'id,snippet,contentDetails,status',
                'mine' => 'true',
                'maxResults' => 50
            ]
        ]);
        if ($response->getStatusCode() != 200) {
            return new Response(
                $response->getStatusCode(),
                ['message' => 'Google session has expired']
            );
        }
        $data = json_decode($response->getBody()->getContents());
        $items = $data->items;
        if (isset($data->nextPageToken)) {
            $totalResults = $data->pageInfo->totalResults;
            $nextPageToken = $data->nextPageToken;
            while (count($items) < $totalResults) {
                $response = $httpClient->get('https://www.googleapis.com//youtube/v3/playlistItems', [
                    'query' => [
                        'playlistId' => $playlistId,
                        'part' => 'id,snippet,contentDetails,status',
                        'mine' => 'true',
                        'maxResults' => 50,
                        'pageToken' => $nextPageToken
                    ]
                ]);
                $data = json_decode($response->getBody()->getContents());
                $items = array_merge($items, $data->items);
                if (isset($data->nextPageToken)) {
                    $nextPageToken = $data->nextPageToken;
                } else {
                    $nextPageToken = null;
                }
            }
        }
        return new Response(
            $response->getStatusCode(),
            $items
        );
    }

    public function getYoutubeVideo($videoId)
    {

        $httpClient = $this->client->authorize();
        $response = $httpClient->get('https://www.googleapis.com//youtube/v3/videos', [
            'query' => [
                'id' => $videoId,
                'part' => 'id,snippet,contentDetails,status,player'
            ]
        ]);
        $data = json_decode($response->getBody()->getContents());
        if ($data->pageInfo->totalResults == 0) {
            return new Response(
                404,
                ['message' => 'Video not found']
            );
        }
        return new Response(
            $response->getStatusCode(),
            $data->items[0]
        );
    }

}
