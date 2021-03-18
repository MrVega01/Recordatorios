var recordatoriosSeleccionados = [];

function textoValido(texto){
  if (texto == null || texto == "" || texto.length < 1) {
    return false;
  }
  else {
    return true;
  }
}
function mostrarError(){
  var html = "";
  html += '<div class="alert alert-danger">';
  html += 'No puedes dejar el campo de texto vacío.';
  html += '</div>';

  document.getElementById('error').innerHTML = html;
}
function mostrarErrorEliminar(){
  var html = "";
  html += '<div class="alert alert-danger">';
  html += 'Debes seleccionar los recordatorios que deseas eliminar.';
  html += '</div>';

  document.getElementById('errorEliminar').innerHTML = html;
}
function limpiarError(){
  document.getElementById('error').innerHTML = "";
}
function limpiarErrorEliminar(){
  document.getElementById('errorEliminar').innerHTML = "";
}
function crearRecordatorio(){
  var contenidoTextArea = document.getElementById('texto').value;
  if (!textoValido(contenidoTextArea)) {
    mostrarError();
    return;
  }
  limpiarError();

  var referencia = new Date();
  var id = referencia.getTime();
  var fecha = referencia.toLocaleDateString();
  var texto = contenidoTextArea;

  var recordatorio = {"id": id, "fecha": fecha, "texto": texto};

  comprobarRecordatorio(recordatorio);
  document.getElementById('texto').value = "";
}
                //APERTURA DE COMPROBACIONES
function comprobarRecordatorio(recordatorio){
  var recordatoriosExistentes = localStorage.getItem("recordatorios");
  if (recordatoriosExistentes == null || recordatoriosExistentes == "") {
    var recordatorios = [];
    recordatorios.push(recordatorio);

    //GUARDAR RECORDATORIO
    guardarRecordatorios(recordatorios);
  }
  else {
    //En caso de que si existan recordatorios
    var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
    recordatoriosRecuperados.push(recordatorio);

    guardarRecordatorios(recordatoriosRecuperados);
  }
  mostrarRecordatorios();
  seleccionarRecordatorios();
}
function guardarRecordatorios(recordatorios){
  var recordatoriosJSON = JSON.stringify(recordatorios);
  localStorage.setItem("recordatorios", recordatoriosJSON);
}
              //CIERRE DE COMPROBACIONES
function mostrarRecordatorios(){
  var html = "";
  var recordatoriosExistentes = localStorage.getItem("recordatorios");
  if (recordatoriosExistentes == null || recordatoriosExistentes == "") {
    html = "Acá se mostrarán tus recordatorios";
    document.getElementById('recordatorios').innerHTML = html;
  }
  else {
    var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
    for (var i = 0; i < recordatoriosRecuperados.length; i++) {
      html += formatoRecordatorios(recordatoriosRecuperados[i]);
    }
    document.getElementById('recordatorios').innerHTML = html;
  }
}
function formatoRecordatorios(recordatorio){
  var html = "";
  html += '<div class="colorground recordatorio" id="' + recordatorio.id + '">';
  html += '<div class="row">';
  html += '<div class="col-6 text-left">';
  html += '<small><i class="fa fa-calendar"></i>' + ' ' + recordatorio.fecha + '</small>';
  html += '</div>';
  html += '<div class="col-6 text-right" id="iconDelete' + recordatorio.id + '"></div>';
  html += '</div>';
  html += '<div class="row">';
  html += '<div class="col-12 mt-2"><strong>';
  html += recordatorio.texto;
  html += '</strong></div>';
  html += '</div>';
  html += '</div>';

  return html;
}
//BORRADOR DE RECORDATORIOS
function eliminarRecordatorios(){
  if (recordatoriosSeleccionados.length > 0) {
    var recordatoriosExistentes = localStorage.getItem("recordatorios");
    if (recordatoriosExistentes != null || recordatoriosExistentes != "") {
      var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
      for (var i = 0; i < recordatoriosSeleccionados.length; i++) {
        for (var a = 0; a < recordatoriosRecuperados.length; a++) {
          if (recordatoriosSeleccionados[i] == recordatoriosRecuperados[a].id) {
            recordatoriosRecuperados[a].id = -1;
          }
        }
      }
      var recordatoriosTemporales = [];
      for (var b = 0; b < recordatoriosRecuperados.length; b++) {
        if (recordatoriosRecuperados[b].id != -1) {
          recordatoriosTemporales.push(recordatoriosRecuperados[b]);
        }
      }
      if (recordatoriosTemporales.length == 0) {
        localStorage.setItem("recordatorios", "");
      }
      else {
        guardarRecordatorios(recordatoriosTemporales);

      }
      mostrarRecordatorios();
      seleccionarRecordatorios();
    }
  }
  else {
    mostrarErrorEliminar();
  }
}
//SELECCION DE RECORDATORIOS
function seleccionarRecordatorios(){
  var recordatorios = document.getElementsByClassName('recordatorio');
  for (var i = 0; i < recordatorios.length; i++) {
    document.getElementById(recordatorios[i].id).onclick = function(e){
      e.stopPropagation();
      if (recordatoriosSeleccionados.indexOf(this.id) == -1) {
        this.style.backgroundColor = "#dc3545";
        document.getElementById('iconDelete' + this.id).innerHTML = '<i class="fas fa-trash-alt"></i>';
        recordatoriosSeleccionados.push(this.id);
        limpiarErrorEliminar();
      }
      else {
        this.style.backgroundColor = "#64E9C2"
        document.getElementById('iconDelete' + this.id).innerHTML = '';
        for (var a = 0; a < recordatoriosSeleccionados.length; a++) {
          if (recordatoriosSeleccionados[a] == this.id) {
            recordatoriosSeleccionados[a] = 0;
          }
        }
      }
      var recordatoriosTemporales = [];
      for (var b = 0; b < recordatoriosSeleccionados.length; b++) {
        if (recordatoriosSeleccionados[b] != 0) {
          recordatoriosTemporales.push(recordatoriosSeleccionados[b]);
        }
      }
      recordatoriosSeleccionados = recordatoriosTemporales;
    }
  }
}
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('botonGuardar').onclick = crearRecordatorio;
  document.getElementById('botonBorrar').onclick = eliminarRecordatorios;
  mostrarRecordatorios();
  seleccionarRecordatorios();
})
