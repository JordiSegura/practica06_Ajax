/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        //Borrar localStorage
        //localStorage.removeItem("Usuario");
        //localStorage.removeItem("Password");
        show();
        $('#add').click(add);
        $('#login').click(login);
        $('#registro').click(registro);
        if (localStorage.getItem("Usuario") == null) {
            $('#toggle').hide();
        } else {
            $('#toggleLogin').hide();
        }
        
    }
};

function login() {
    var usuario = $("#usuarioInput").val();
    var password = $("#passwordInput").val();
    var usuarioRegistrado = localStorage.getItem("Usuario");
    var passwordRegistrado = localStorage.getItem("Password");
    if (usuario == usuarioRegistrado && password == passwordRegistrado) {
        alert("Usuario Correcto!");
        $('#toggle').show();
        $('#toggleLogin').hide();
    } else {
        alert("Usuario Incorrecto!");
    }
}

function registro() {
    var usuario = $("#usuarioInput").val();
    var password = $("#passwordInput").val();
    localStorage.setItem("Usuario", usuario);
    localStorage.setItem("Password", password);
    $("#usuarioInput").val("");
    $("#passwordInput").val("");
    alert("Usuario Registrado!");
}
function show() {
    $.ajax({
        url: "https://practica06ajaxjordi.000webhostapp.com/showData.php",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (respJSON) {
            $("#respAjax").html('');
            var notas = respJSON.notas;
            for (var i = 0; i < notas.length - 1; i++) {
                var idNota = notas[i].idNota;
                var titulo = notas[i].titulo;
                var descripcion = notas[i].descripcion;
                $("#respAjax").append("<div value='" + idNota + "'> \n\
                                        Titulo: <input type='text' id='title" + idNota + "' value='" + titulo + "'> \n\
                                        Descripcion: <input type='text' id='desc" + idNota + "' value='" + descripcion + "'> \n\
                                        <a href='#' class='btn btn-success btn-lg' class='update'  onclick='update(\"" + idNota + "\")'>update</a>\n\
                                        <a href='#' class='btn btn-danger btn-lg' class='del' onclick='del(\"" + idNota + "\")'>Delete</a>\n\
                                        </div>");

            }
        }
    });
}
function add() {
    var titulo = $("#tituloInput").val();
    var descripcion = $("#descripcionInput").val();
    $.ajax({
        url: "https://practica06ajaxjordi.000webhostapp.com/addData.php",
        dataType: "jsonp",
        jsonp: "callback",
        data: {titulo: titulo, descripcion: descripcion},
        success: function (respJSON) {
            $("#respInsert").html(respJSON.respuesta);
            $("#respAjax").append("<div value='" + respJSON.idNota + "'>\n\
                                    Titulo: <input type='text' id='title" + respJSON.idNota + "' value='" + respJSON.titulo + "'>\n\
                                    Descripcion: <input type='text' id='desc" + respJSON.idNota + "' value='" + respJSON.descripcion + "'>\n\
                                    <a href='#' class='btn btn-success btn-lg' class='update'  onclick='update(\"" + respJSON.idNota + "\")'>update</a>\n\
                                    <a href='#' class='btn btn-danger btn-lg' class='del' onclick='del(\"" + respJSON.idNota + "\")'>Delete</a>\n\
                                    </div>");
        }
    });
}
function update(idNota) {
    var titulo = $("#title" + idNota).val();
    var descripcion = $("#desc" + idNota).val();
    $.ajax({
        url: "https://practica06ajaxjordi.000webhostapp.com/updateData.php",
        dataType: "jsonp",
        jsonp: "callback",
        data: {idNota: idNota, titulo: titulo, descripcion: descripcion},
    });
}
function del(idNota) {
    $.ajax({
        url: "https://practica06ajaxjordi.000webhostapp.com/removeData.php",
        dataType: "jsonp",
        jsonp: "callback",
        data: {idNota: idNota},
        success: function (respJSON) {
            $('[value="' + respJSON.idNota + '"]').remove();
        }
    });
}
app.initialize();