<?php
require_once './assets/tools/connect.php';
$button = isset($_GET['record']) ? 'Try again' : "Take 'em out";

$query = $db->query("SELECT `record`, `date` FROM `records` ORDER BY `record` LIMIT 5")->fetchAll();
ob_start();

foreach ($query as $record) { ?>
  <article>
    <h1><?= $record['record'] ?></h1>
    <h2><?= $record['date'] ?></h2>
  </article>
<?php } ?>
<div class="container">
  <div class="player active">1</div>
  <button>
    <a href=""><?= $button ?></a>
  </button>
  <div class="player" value='multi'>2</div>
</div>

<?php $records = ob_get_clean();
