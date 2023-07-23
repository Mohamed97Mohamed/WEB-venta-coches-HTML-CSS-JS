
function add(prodNombre,prodPrecio, subtotal, cantidad, total){
	
	var salidaTxt2 = total;
	
	/*console.log(salidaHTML);*/
	var salidaHTML =  "<tr id='"+ prodNombre +"'>"+"<td>" + cantidad +" "+"</td>" + "<td>" + prodNombre +" "+ "</td>" + "<td>" + prodPrecio +" "+"</td>" + "<td>" + subtotal + " "+"</td>" + "</tr>";
	
	var fila = document.getElementById(prodNombre);
	
	if(fila == null){
		
		var salidaHTML_HTML= document.getElementById("cuerpoTabla");
		salidaHTML_HTML.innerHTML = salidaHTML_HTML.innerHTML+"\n"+salidaHTML;
		
	}else{
		cantidad = parseInt(fila.childNodes[0].textContent) + parseInt(cantidad);
		subtotal = parseInt(fila.childNodes[3].textContent) + subtotal;
		
		fila.childNodes[0].innerText = cantidad;
		fila.childNodes[3].innerText = subtotal;
	}
	
	
	var salidaHTML_Text2= document.getElementById("span");
	salidaHTML_Text2.innerText = salidaTxt2;
	
	
	
	var salidaOculto = document.getElementById("OcultoId").value = salidaHTML_HTML.textContent;
	var OculTtotal = document.getElementById("TotalOculto").value = salidaHTML_Text2.textContent;
	
	
	
}

function extractProductLineToAdd() {
	console.log("extractProductLineToadd");
	
	//PASO1: extraer cantidad
	var cantidadInput = document.getElementById("cantidad");
	var cantidad = cantidadInput.value;
	//alert(cantidad);
	console.log(cantidad);
	
	//PASO2: extraer productos seleccionado
	var prodSelect = document.getElementById("select");
	var indiceSeleccionado = prodSelect.selectedIndex;
	console.log("indiceSeleccionado: "+indiceSeleccionado);
	var opcionSeleccionada = prodSelect .options[indiceSeleccionado];

	//PASO3: extraer total
	var total = document.getElementById("span").innerText;
	total = parseInt(total);
	console.log(total);
	
	//PASO4: extraer cantidad y producto
	var prodSelectValue = prodSelect.value;
	var prodSelectNombre = opcionSeleccionada.text;
	console.log(prodSelectValue);
	console.log(prodSelectNombre);
	
	//PASO5: realizo calculo
	var subtotal = prodSelectValue*cantidad;
	var totalActualizado = total + subtotal;
	
	
	//PASO7: añado linea de producto
	add(prodSelectNombre,prodSelectValue,subtotal, cantidad,totalActualizado);
	
	
	
}

function validacion(){
	
	/*var salidaIncorrecto2 = "El DC es incorrecto!!";
	var salidaHTML_salidaIncorrecto2= document.getElementById("CCCIncorrecto");
	
	var salidaIncorrecto = "Dni erroneo, la letra del NIF no se corresponde";
	var salidaHTML_salidaIncorrecto= document.getElementById("DNIIncorrecto");*/
	
	if(extractDNI()==false && extractCCC()==false){
		document.getElementById("DNIIncorrecto").innerText  ="El DNI es incorrecto!!";
		document.getElementById("CCCIncorrecto").innerText ="El DC es incorrecto!!";
		/*salidaHTML_salidaIncorrecto.innerText = salidaIncorrecto;*/
		return false;
	} else if(extractDNI()==true && extractCCC()==false ){
		document.getElementById("DNIIncorrecto").innerText  ="";
		document.getElementById("CCCIncorrecto").innerText ="El DC es incorrecto!!";
		/*salidaHTML_salidaIncorrecto2.innerText = salidaIncorrecto2;*/
		return false;
	} else if(extractDNI()==false && extractCCC()==true ){
		document.getElementById("DNIIncorrecto").innerText  ="El DNI es incorrecto!!";
		document.getElementById("CCCIncorrecto").innerText ="";
		/*salidaHTML_salidaIncorrecto2.innerText = salidaIncorrecto2;*/
		return false;
	}
	
	document.getElementById("DNIIncorrecto").innerText  ="";
	document.getElementById("CCCIncorrecto").innerText ="";
	
	return true;
	
	/*extractDNI(); 
	extractCCC();
	
	return true;*/
}


function validacion2(){
	
	
	
	if(extractDNI()==false && calcularEdad()==false){
		document.getElementById("DNIIncorrecto").innerText  ="El DNI es incorrecto!!";
		document.getElementById("edadIncorrecta").innerHTML="Eres menor de edad";
	
		return false;
	} else if(extractDNI()==true && calcularEdad()==false ){
		document.getElementById("DNIIncorrecto").innerText  ="";
		document.getElementById("edadIncorrecta").innerHTML="Eres menor de edad";
		
		return false;
	} else if(extractDNI()==false && calcularEdad()==true ){
		document.getElementById("DNIIncorrecto").innerText  ="El DNI es incorrecto!!";
		document.getElementById("edadIncorrecta").innerHTML="";
		return false;
	}
	
	document.getElementById("DNIIncorrecto").innerText  ="";
	document.getElementById("edadIncorrecta").innerHTML="";
	
	return true;
	

}
function extractDNI() {
	var dni = document.getElementById("dni").value;
	nif(dni);
	if(nif(dni)== false){
		return false;
	}else{
		return true;
	}
}



function nif(dni) {
  var numero;
  var letr;
  var letra;
  var expresion_regular_dni;

 
  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
 
  if(expresion_regular_dni.test (dni) == true){
     numero = dni.substr(0,dni.length-1);
     letr = dni.substr(dni.length-1,1);
     numero = numero % 23;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     letra=letra.substring(numero,numero+1);
    if (letra!=letr.toUpperCase()) {

	   return false;
     }else{

	   return true;
     }
  }else{
	 return false;
   }
   /*
   1º La función recibe una variable con el DNI como string.

2º Tras definir las variables creamos una expresión regular que valida si el DNI está compuesto por 8 letras y un caracter, ya sea en mayúscula o minúscula.

3º Extraemos el número del DNI (es decir, un substring con la longitud del DNI entero menos una letra) y la letra (un substring de un solo caracter que empieza en la posición de la longitud total menos uno).

4º Hacemos la operación de módulo entre el número extraído y 23, reutilizando la variable número para almacenar el resultado. Hacemos esto porque lo necesitamos para calcular si la letra del NIF es válida.

5º Creamos una string con las letras del abecedario ( sin la ñ) en este orden específicamente: TRWAGMYFPDXBNJZSQVHLCKET

6º Cogemos un substring de un solo caracter de esa cadena de letras que empiece en la posición marcada por el número que conseguimos en el punto cuatro al hacer la operación de módulo, reutilizando la variable módulo.

7º Comprobamos que la letra cogida de la cadena de letras sea igual a la letra cogida del DNI. Si se cumple la condición sacamos un aviso de que es correcto y si no sacamos el de error.

El código tal cual es para introducir un dni con la letra pegada al número. Si se quiere admitir un guión entre los números y la letra habría que modificar la función.
*/
}

/*-----------Funcion para validar el numero de cuenta bancaria*/

function extractCCC() {
	var entidad = document.getElementById("entidad").value;
	var sucursal = document.getElementById("sucursal").value;
	var dc = document.getElementById("dc").value;
	var nCuenta = document.getElementById("nCuenta").value;
	var dcfinal = compruebaCCC(entidad,sucursal,dc,nCuenta);
	
	if(dcfinal == dc){
		return true;
	}else{
		return false;
	}
}

function compruebaCCC(entidad,sucursal,dc,nCuenta){
	entidad = rellenaCeros(entidad,4);
	sucursal = rellenaCeros(sucursal,4);
	dc = rellenaCeros(dc,2);
	nCuenta = rellenaCeros(nCuenta,10);

	var concatenado = entidad+sucursal;
	var dc1 = calculaDCParcial(concatenado);
	var dc2 = calculaDCParcial(nCuenta);
	var dcfinal = dc1+dc2;
	return dcfinal;
}

function calculaDCParcial(cadena){
	var dcParcial = 0;
	var tablaPesos = [6,3,7,9,10,5,8,4,2,1];
	var suma = 0;
	var i;
	for(i=0;i<cadena.length;i++){
		suma = suma + cadena.charAt(cadena.length-1-i)*tablaPesos[i];
	}
	dcParcial = (11-(suma % 11));
	if(dcParcial==11)
		dcParcial=0;
	else if(dcParcial==10)
		dcParcial=1;
	return dcParcial.toString();
}

function rellenaCeros(numero,longitud){
	var ceros = '';
	var i;
	numero = numero.toString();
	for(i=0;(longitud-numero.length)>i;i++){
		ceros += '0';
	}	
	return ceros+numero;
}

/*------------Funciones para validar si el usuario es mayor de edad--------------*/

function isValidDate(day,month,year)
{
    var dteDate;
 
    // En javascript, el mes empieza en la posicion 0 y termina en la 11 
    //   siendo 0 el mes de enero
    // Por esta razon, tenemos que restar 1 al mes
    month=month-1;
    // Establecemos un objeto Data con los valore recibidos
    // Los parametros son: año, mes, dia, hora, minuto y segundos
    // getDate(); devuelve el dia como un entero entre 1 y 31
    // getDay(); devuelve un num del 0 al 6 indicando siel dia es lunes,
    //   martes, miercoles ...
    // getHours(); Devuelve la hora
    // getMinutes(); Devuelve los minutos
    // getMonth(); devuelve el mes como un numero de 0 a 11
    // getTime(); Devuelve el tiempo transcurrido en milisegundos desde el 1
    //   de enero de 1970 hasta el momento definido en el objeto date
    // setTime(); Establece una fecha pasandole en milisegundos el valor de esta.
    // getYear(); devuelve el año
    // getFullYear(); devuelve el año
    dteDate=new Date(year,month,day);
 
    //Devuelva true o false...
    return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
}

/**
 * Funcion para validar una fecha
 * Tiene que recibir:
 *  La fecha en formato ingles yyyy-mm-dd
 * Devuelve:
 *  true-Fecha correcta
 *  false-Fecha Incorrecta
 */
function validate_fecha(fecha)
{
    var patron=new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
 
    if(fecha.search(patron)==0)
    {
        var values=fecha.split("-");
        if(isValidDate(values[2],values[1],values[0]))
        {
            return true;
        }
    }
    return false;
}
 
/**
 * Esta función calcula la edad de una persona y los meses
 * La fecha la tiene que tener el formato yyyy-mm-dd que es
 * metodo que por defecto lo devuelve el <input type="date">
 */
function calcularEdad()
{
    var fecha=document.getElementById("user_date").value;
    if(validate_fecha(fecha)==true)
    {
        // Si la fecha es correcta, calculamos la edad
        var values=fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];
 
        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();
 
        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if ( ahora_mes < mes )
        {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia))
        {
            edad--;
        }
        if (edad > 1900)
        {
            edad -= 1900;
        }
 
        // calculamos los meses
        var meses=0;
        if(ahora_mes>mes)
            meses=ahora_mes-mes;
        if(ahora_mes<mes)
            meses=12-(mes-ahora_mes);
        if(ahora_mes==mes && dia>ahora_dia)
            meses=11;
 
        // calculamos los dias
        var dias=0;
        if(ahora_dia>dia)
            dias=ahora_dia-dia;
        if(ahora_dia<dia)
        {
            ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
            dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
        }
 
    }else{
    }
	
	if(edad < 18){
		return false;
		
	}else{
		return true;
	}
}