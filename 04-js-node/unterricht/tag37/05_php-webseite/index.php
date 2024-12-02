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
      <h1>Webseite</h1>
      <?php echo '<p>HELLO FROM PHP</p>' ?>

      <?php
      if (isset($_GET)) {
        echo '<pre>';
        print_r($_GET);
        echo '</pre>';
      }
      ?>

      <?php
      if (isset($_POST)) {
        echo '<pre>';
        print_r($_POST);
        echo '</pre>';
      }
      ?>

      <form action="contact.php" method="post">
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="input-firstname">Vorname</label>
              <input type="text" name="firstname" id="input-firstname" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="input-lastname">Nachname</label>
              <input type="text" name="lastname" id="input-lastname" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">

                <label for="input-email">Email</label>
                <input type="email" name="email" id="input-email" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="textarea-message">Nachricht</label>
                <textarea name="message" id="textarea-message" class="form-control"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <button class="btn btn-dark button-send">Senden</button>
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>
  </main>
</body>

</html>