<?php

/**
 * A singleton for database connection
 */

require_once("dbConnectionVariables.php");

class Database {
    private static $dbInstance;
    private $connection;

    private function __construct() {
        $this->connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

        if (mysqli_connect_error()) {
            trigger_error("Error while connecting database " . mysqli_connect_error(), E_USER_ERROR);
            echo "error";
        }
    }

    public static function getDBInstance() {
        if (!self::$dbInstance) {
            self::$dbInstance = new self();
        }
        return self::$dbInstance;
    }


    // Performs lazy initialization of DBInstance
    public function getDBConnection() {
        return $this->connection;
    }

    private function __clone() {
        // Empty method to prevent cloning
    }

}