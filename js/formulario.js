(function() {
    var formulario = document.formulario_registro,
        elementos = formulario.elements;

    // Funcion que se ejecuta cuando el evento click es activado

    var validarInputs = function() {
        for (var i = 0; i < elementos.length ; i++) {
     // Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
            if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
    // Si es tipo texto, email o password vamos a comprobar que esten completados los input
                if (elementos[i].value == 0) {
                    console.log('El campo ' + elementos[i].name + ' está incompleto');
                    elementos[i].className = elementos[i].className + ' error';
                    return false;
                } else {
                   elementos[i].className = elementos[i].className.replace(" error", "" );
                }
            }
        }

        // Comprobando que las contraseñas coincidan
        if (elementos.pass.value !== elementos.pass2.value) {
            elementos.pass.value = "";
            elementos.pass2.value = "";
            elementos.pass.className = elementos.pass.className + " error";
            elementos.pass2.className = elementos.pass2.className + " error";
        } else {
            elementos.pass.className = elementos.pass.className.replace(" error", "");
            elementos.pass2.className = elementos.pass2.className.replace(" error", "");
        }
        return true;
    };

    var validarRadios = function() {
        var opciones = document.getElementsByName('sexo'),
            resultado = false;

        for (var i = 0; i < elementos.length; i++) {
            if(elementos[i].type == "radio" && elementos[i].name == "sexo") {
                // Recorremos los radio buttons
                for (var o = 0; o < opciones.length; o++) {
                    if (opciones[o].checked) {
                        resultado = true;
                        break;
                    }
                }
                   if(resultado == false) {
                       elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
                       console.log('El campo sexo está incompleto');
                       return false;
            } else {
                elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
                return true;
            }
        }

       }
    };

    var validarCheckbox = function(){
	var opciones = document.getElementsByName('terminos'),
		resultado = false;

	for (var i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "checkbox"){
			for (var o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				console.log('Falta por aceptar los términos');
				return false;
			} else {
				// Eliminamos la clase Error del checkbox
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};

    var enviar = function(e) {
        if (!validarInputs()){
          console.log('Falta validar los inputs');
          e.preventDefault();
        } else if(!validarRadios()) {
          console.log('Falta validar los radio buttons');
          e.preventDefault();
        } else if(!validarCheckbox()) {
           console.log('Falta validar los Checkbox');
          e.preventDefault();
        } else {
            console.log('Envio correcto');
         // e.preventDefault();
        }
    };
    // Funciones 'blur' y 'focus'
    var focusInput = function() {
        this.parentElement.children[1].className = "label active";
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
    };

    var blurInput = function(){
        if (this.value <= 0) {
            this.parentElement.children[1].className = "label";
            this.parentElement.children[0].className = this.parentElement.children[0].className + "error";
        }
    };
    //    Eventos
    formulario.addEventListener("submit", enviar);

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
            elementos[i].addEventListener("focus", focusInput);
            elementos[i].addEventListener("blur", blurInput);
         };
    }

}())
