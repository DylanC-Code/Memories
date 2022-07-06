<?php
isset($_GET['record']) ?
  require './assets/PHP/insert_record.php' : null;
require_once './assets/PHP/records.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./assets/css/style.css" />
  <script src="script.js" defer></script>
  <title>Memories</title>
</head>

<body>
  <header>
    <h1>Memories</h1>
    <h2><?= isset($_GET['record']) ? 'You won' : null; ?></h2>
    <h3><?= isset($_GET['record']) ? $_GET['record'] : null; ?></h3>
  </header>
  <main>
    <section id="records">
      <h1>Top 5</h1>
      <?= $records ?>
    </section>
  </main>
</body>

</html>