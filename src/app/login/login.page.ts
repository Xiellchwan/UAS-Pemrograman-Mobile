import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    // Cek apakah pengguna sudah login
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/tabs/tab1']); // Ganti dengan halaman yang sesuai setelah login
    }
  }

  async login() {
    if (this.username === '' || this.password === '') {
      const toast = await this.toastController.create({
        message: 'Username dan password harus diisi',
        duration: 2000
      });

      return;
    }

    let body = {
      username: this.username,
      password: this.password,
      aksi: 'login'
    };

    this.postPvdr.postData(body, 'action.php').subscribe(async data => {
      if (data.success) {
        // Simpan data user ke local storage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Tampilkan pesan selamat datang
        const toast = await this.toastController.create({
          message: `Selamat datang, ${data.user.nama_lengkap}!`,
          duration: 2000
        });
        toast.present();



        this.router.navigate(['/tabs/tab1']); // Ganti dengan halaman yang sesuai setelah login
      } else {
        const toast = await this.toastController.create({
          message: data.msg,
          duration: 2000
        });
        toast.present();

      }
    });


  }

}
