
alert("hola soy un mensaje");





























// // validacion por frontend

// const form = document.getElementById('formularioValidado');
// const nombreFormulario = document.getElementById('nombreFormulario');
// const apellidoFormulario = document.getElementById('apellidoFormulario');
// const emailFormulario = document.getElementById('emailFormulario');
// const passwordFormulario = document.getElementById('passwordFormulario');
// const password2 = document.getElementById('password2');

// form.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	// checkInputs();
// });

// function checkInputs() {
//     // trim para sacar los espacios en blanco
// 	const usernameValue = nombreFormulario.value.trim();
//     const userLnValue = apellidoFormulario.value.trim();
// 	const emailValue = emailFormulario.value.trim();
// 	const passwordValue = passwordFormulario.value.trim();
// 	const password2Value = password2.value.trim();
// 	// mensajes de validacion
// 	if(usernameValue === '') {
// 		setErrorFor(nombreFormulario, 'El campo de nombre no puede estar vacio');
// 	} else if (usernameValue.length <2){
//         setErrorFor(nombreFormulario, 'El campo de nombre no puede estar vacio');
//     } else {
// 		setSuccessFor(nombreFormulario);
// 	}
//     if(userLnValue === '') {
// 		setErrorFor(userLnValue, 'El campo de apellido no puede estar vacio');
// 	} else {
// 		setSuccessFor(userLnValue);
// 	}
	
// 	if(emailValue === '') {
// 		setErrorFor(email, 'Debe ingresar un mail');
// 	} else if (!isEmail(emailValue)) {
// 		setErrorFor(email, 'El e-mail es invalido');
// 	} else {
// 		setSuccessFor(email);
// 	}
	
// 	if(passwordValue === '') {
// 		setErrorFor(password, 'Debe ingresar una contraseña');
// 	} else {
// 		setSuccessFor(password);
// 	}
	
// 	if(password2Value === '') {
// 		setErrorFor(password2, 'Este campo no puede estar vacio');
// 	} else if(passwordValue !== password2Value) {
// 		setErrorFor(password2, 'Las contraseñas no coinciden');
// 	} else{
// 		setSuccessFor(password2);
// 	}
// }

// // function setErrorFor(input, message) {
// // 	const formControl = input.parentElement;
// // 	const small = formControl.querySelector('small');
// // 	formControl.className = 'form-control error';
// // 	small.innerText = message;
// // }

// // function setSuccessFor(input) {
// // 	const formControl = input.parentElement;
// // 	formControl.className = 'form-control success';
// // }
	
// // function isEmail(email) {
// // 	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
// // }