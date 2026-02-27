import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  showPassword = false;
  banMessage: string = '';
  errorMessage: string = ''; // Nuevo: Mensaje de error para campos vacíos

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.checkBanStatus();
  }

  checkBanStatus(): void {
    if (this.appService.isBanned()) {
      this.banMessage = `Usted ha sido baneado del servidor. Le quedan ${this.appService.getRemainingBanTime()} para poder intentar de nuevo.`;
    } else {
      this.banMessage = '';
    }
  }

  onLogin() {
    this.errorMessage = ''; // Limpiar mensajes de error anteriores
    this.checkBanStatus(); // Re-check ban status before attempting login

    if (this.appService.isBanned()) {
      // console.log('Intento de login bloqueado: Usuario baneado.');
      return;
    }

    // Validar campos vacíos
    if (!this.username.trim()) {
      this.errorMessage = 'Ingrese su nombre de usuario.';
      return;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'Ingrese su contraseña.';
      return;
    }

    // console.log(`LoginComponent: Attempting login with username: ${this.username}, password: ${this.password}`);
    this.appService.login(this.username, this.password).subscribe(result => {
      if (result.loggedIn) {
        // console.log('Login exitoso!');
        this.appService.handleSuccessfulLogin();
        this.banMessage = ''; // Clear ban message on successful login
        this.router.navigate(['/inicio']); // Redirigir a la página de inicio
      } else {
        // console.log('Login fallido. Usuario o contraseña incorrectos.');
        this.appService.handleFailedLogin();
        this.checkBanStatus(); // Update ban message after failed attempt
        this.errorMessage = 'Usuario o contraseña incorrectos.'; // Mensaje de error para credenciales inválidas
      }
    });
  }
}
