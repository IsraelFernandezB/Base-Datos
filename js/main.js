var btn_cargar = document.getElementById('btn_cargar_usuarios'),
	error_box = document.getElementById('error_box'),
	tabla = document.getElementById('tabla'),
	loader = document.getElementById('loader');

var usuario_fecha,
	usuario_nombre,
	usuario_telefono,
	usuario_correo,
	usuario_trabajo;

function cargarUsuarios(){
	tabla.innerHTML = '<tr><th>Fecha</th><th>Nombre</th><th>Telefono</th><th>Correo</th><th>Trabajo</th></tr>';

	var peticion = new XMLHttpRequest();
	peticion.open('GET', 'php/leer-datos.php');

	loader.classList.add('active');

	peticion.onload = function(){
		var datos = JSON.parse(peticion.responseText);

		if(datos.error){
			error_box.classList.add('active');
		} else {
			for(var i = 0; i < datos.length; i++){
				var elemento = document.createElement('tr');
			//	elemento.innerHTML += ("<td>" + datos[i].id + "</td>");
				elemento.innerHTML += ("<td>" + datos[i].fecha + "</td>");
				elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
				elemento.innerHTML += ("<td>" + datos[i].telefono + "</td>");
				elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
				elemento.innerHTML += ("<td>" + datos[i].trabajo + "</td>");
				tabla.appendChild(elemento);
			}
		}

	}

	peticion.onreadystatechange = function(){
		if(peticion.readyState == 4 && peticion.status == 200){
			loader.classList.remove('active');
		}
	}

	peticion.send();
}

function agregarUsuarios(e){
	e.preventDefault();

	var peticion = new XMLHttpRequest();
	peticion.open('POST', 'php/insertar-usuario.php');

	usuario_fecha = formulario.fecha.value.trim();
	usuario_nombre = formulario.nombre.value.trim();
	usuario_telefono = formulario.telefono.value.trim();
	usuario_correo = formulario.correo.value.trim();
	usuario_trabajo = formulario.trabajo.value.trim();

	if(formulario_valido()){
		error_box.classList.remove('active');
		var parametros = 'fecha='+ usuario_fecha + '&nombre='+ usuario_nombre + '&telefono='+ usuario_telefono +'&correo='+ usuario_correo +'&trabajo=' + usuario_trabajo;

		peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		loader.classList.add('active');

		peticion.onload = function(){
			cargarUsuarios();
			formulario.fecha.value = '';
			formulario.nombre.value = '';
			formulario.telefono.value = '';
			formulario.correo.value = '';
			formulario.trabajo.value = '';
		}

		peticion.onreadystatechange = function(){
			if(peticion.readyState == 4 && peticion.status == 200){
				loader.classList.remove('active');
			}
		}

		peticion.send(parametros);


	} else {
		error_box.classList.add('active');
		error_box.innerHTML = 'Por favor completa el formulario correctamente';
	}
}

btn_cargar.addEventListener('click', function(){
	cargarUsuarios();
});

formulario.addEventListener('submit', function(e){
	agregarUsuarios(e);
});

function formulario_valido(){
	if(usuario_fecha == ''){
		return false;
	} else if(usuario_nombre == ''){
		return false;
	} else if(usuario_telefono == ''){
		return false;
	} else if(usuario_correo == ''){
		return false;
	} else if(usuario_trabajo == ''){
		return false;
	}

	return true;
}
