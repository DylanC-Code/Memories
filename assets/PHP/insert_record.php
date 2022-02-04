<?php require_once 'assets\tools\connect.php';
$date = $_GET['date'];
$record = $_GET['record'];

$query = $db->query("SELECT * FROM `records` WHERE `record` = '$record' AND `date` = '$date'")->fetch();
var_dump($query);

// if (!$query):
//     $query = $db->prepare("INSERT INTO `records` (`record`, `date`) VALUES (:record, :date)");
//     $query->execute([':record' => $record, ':date' => $date]);
// endif;
