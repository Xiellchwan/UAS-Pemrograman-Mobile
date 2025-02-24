import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, ModalController, IonModal } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  penduduks: any = [];
  searchTerm: string = '';
  limit: number = 10;
  start: number = 0;

  constructor(  
    private router: Router,
    private postPvdr: PostProvider,
    public toastController: ToastController,
    private alertController: AlertController,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.penduduks = [];
    this.start = 0;
    this.loadPenduduk();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadPenduduk().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  loadPenduduk() {
    return new Promise(resolve => {
      let body = {
        aksi: 'get_penduduk',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'action.php').subscribe(data => {
        for (let penduduk of data.result) {
          this.penduduks.push(penduduk);
        }
        resolve(true);
      });
    });
  }

  searchPenduduk() {
    let body = {
      aksi: 'search_penduduk',
      searchTerm: this.searchTerm
    };
    
    if (this.searchTerm.length > 0) {
      this.postPvdr.postData(body, 'action.php').subscribe(data => {
        if (data.success) {
          this.penduduks = data.result;
        }
      });
    } else {
      this.loadPenduduk(); // Jika searchbar kosong, tampilkan semua data
    }
  }

  async openModal(penduduk: any) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        penduduk: penduduk
      }
    });
    return await modal.present();
  }

  async hapusPenduduk(id: string) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            let body = {
              aksi: 'delete_penduduk',
              id: id
            };

            this.postPvdr.postData(body, 'action.php').subscribe(async data => {
              if (data.success) {
                const toast = await this.toastController.create({
                  message: 'Data berhasil dihapus',
                  duration: 2000
                });
                toast.present();
                this.ionViewWillEnter(); // Refresh data
              } else {
                const toast = await this.toastController.create({
                  message: 'Gagal menghapus data',
                  duration: 2000
                });
                toast.present();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
