<?php
try {
    $db = new PDO("mysql:dbname=records;host=localhost;charset=UTF8", 'root');
} catch (Exception $e) {
    echo 'Error SQL :' . $e->getMessage();
}
