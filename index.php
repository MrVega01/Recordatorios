<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">

    <title>Recordatorios dinámicos</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
      <h1 class="display-4 textWhite textShadow">Recordatorios dinámicos</h1>
      <p class="lead textWhite textShadow">Tus tareas pendientes no serán olvidadas nunca más.</p>
    </div>
  </div>
  <div class="container-md">
    <div class="row fontStyle text-center">
      <div class="col-md-6">
        <h3 id="colorNuevoRecordatorio"><strong>Nuevo recordatorio <i class="fas fa-paper-plane"></i></strong></h3>
        <div class="form-group text-center">
          <textarea class="form-control mb-3" name="name" rows="5" cols="80" id="texto"></textarea>
          <div id="error"></div>
          <div id="errorEliminar"></div>
          <div class="row">
            <div class="col-lg-6">
              <button type="button" class="btn btn-success form-control" id="botonGuardar">Guardar <i class="fas fa-save"></i></button>
            </div>
            <div class="col-lg-6">
              <button type="button" class="btn btn-danger form-control disable" id="botonBorrar">Eliminar <i class="fas fa-times"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3 id="colorPendientes"><strong>Pendientes <i class="fas fa-bell"></i></strong></h3>
        <div id="recordatorios"></div>
      </div>
    </div>
  </div>
    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <script src="js/jquery.min.js" charset="utf-8"></script>
    <script src="js/bootstrap.min.js" charset="utf-8"></script>
    <script src="js/script.js" charset="utf-8"></script>
  </body>
</html>
