<!DOCTYPE html>
<html lang="de">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webseite</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>

<body>
  <main>
    <div class="container py-5">
      <h1>Contact</h1>
      <?php echo '<p>HELLO FROM PHP</p>' ?>

      <?php
      if (isset($_GET)) {
        echo '<pre>';
        print_r($_GET);
        echo '</pre>';
      }
      ?>

      <?php
      if (isset($_POST)) { ?>
        <pre>';
        <?php print_r($_POST); ?>
        </pre>';

        <h2>Hello <?= strtoupper($_POST['firstname']); ?> <?= $_POST['lastname']; ?> </h2>

      <?php } ?>



    </div>
  </main>
</body>

</html>