<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

if (!isset($_SESSION['securityContext'])) {
    $_SESSION['securityContext'] = null;
}

set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'library',
    get_include_path(),
)));


require '../vendor/autoload.php';
// require_once APPLICATION_PATH . 'src/library/Connector/Facebook.php';
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Guzzle\Http\Client;


$app = new \Slim\App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true,
        'displayErrorDetails' => true
    ]
]);
$configs = [];
$container = $app->getContainer();

# container configs
$container['configs'] = $configs;

# container view
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(APPLICATION_PATH . 'src/views', [
        'cache' => false
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));

    return $view;
};

# index
$app->get('/', function ($request, $response){
    $configs = $this['configs'];
    $view = $this['view'];
    $securityContext = isset($_SESSION['securityContext']) ? $_SESSION['securityContext'] : null;

    $templateVars = [
        "configs" => $configs,
        'securityContext' => $securityContext
    ];

    return $this['view']->render(
        $response,
        'pages/index.html.twig',
        $templateVars
    );

});
# post form
$app->post('/', function ($request, $response){
    $configs = $this['configs'];
    $view = $this['view'];
    $securityContext = isset($_SESSION['securityContext']) ? $_SESSION['securityContext'] : null;

    $params = $request->getParsedBody();

    var_dump($params); die();

    $templateVars = [
        "configs" => $configs,
        'securityContext' => $securityContext
    ];

    return $this['view']->render(
        $response,
        'pages/index.html.twig',
        $templateVars
    );

});


// # logout
$app->get("/logout",  function ($request, $response) {
    $_SESSION['securityContext'] = null;
    return $response
        ->withStatus(302)
        ->withHeader('Location', '/');
});



$app->run();
