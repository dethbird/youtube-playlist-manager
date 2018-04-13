<?php
class Response {

    private $statusCode;
    private $body;

    /**
     * Constructor.
     * @param string $statusCode
     * @param object $body
     */
    public function __construct($statusCode = 200, $body=null)
    {
        $this->statusCode = $statusCode;
        $this->body = $body;
    }

    /**
     * Get statusCode
     * @return integer
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Set statusCode
     * @return integer $statusCode
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
    }


    /**
     * Get body
     * @return object
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set body
     * @param object $body
     */
    public function setBody($body)
    {
        $this->body = $body;
    }

}

