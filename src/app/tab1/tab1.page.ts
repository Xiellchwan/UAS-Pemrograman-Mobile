import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/provider/post-provider';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  totalPenduduk: number = 0; 
  totalKK: number = 0;
  totalPria: number = 0;
  totalWanita: number = 0;
  userName: string = '';
  private userId: number = 1;

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.hitungStatistik();
    this.getUserName();
  }

  ionViewWillEnter() {
    this.hitungStatistik();
    this.getUserName();
  }

  doRefresh(event: any) {
    this.hitungStatistik();
    setTimeout(() => {
      event.target.complete();
    }, 50);
  }

  hitungStatistik() {
    let body = {
      aksi: 'get_statistik_penduduk'
    };

    this.postPvdr.postData(body, 'action.php').subscribe(data => {
      if (data.success) {
        this.totalPenduduk = data.result.total_penduduk;
        this.totalKK = data.result.total_kk;
        this.totalPria = data.result.total_pria;
        this.totalWanita = data.result.total_wanita;
      }
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Keluar',
          handler: () => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']).then(() => {
              location.reload();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Ambil data user dari localStorage
    if (user && user.nama_lengkap) {
      this.userName = user.nama_lengkap; // Ambil nama lengkap dari data pengguna
    }
  } 
}
