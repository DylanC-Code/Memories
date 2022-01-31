<?php require_once 'C:\Users\Stagiaire\Desktop\Memories\assets\tools\connect.php';

$query = $db->query("SELECT `record`, `date` FROM `records` ORDER BY `record` LIMIT 5")->fetchAll();
ob_start();

foreach ($query as $record) {?>
<article>
  <h1><?=$record['record']?></h1>
  <h2><?=$record['date']?></h2>
</article>
<?php }?>
<button>
  <a href="">Take 'em out</a>
</button>

<?php $records = ob_get_clean();