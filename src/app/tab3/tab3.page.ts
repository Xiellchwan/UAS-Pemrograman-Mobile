import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  nama: string = '';
  nik: string = '';
  tempat_tgl_lahir: string = '';
  umur: string = '';
  jenis_kelamin: string = '';
  alamat: string = '';
  agama: string = '';
  status_kawin: string = '';
  pekerjaan: string = '';
  posisi: string = '';


  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider
  ) {

  }
  
  ngOnInit() {
  }

  async addpenduduk() {
    if (this.nama == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nik == '') {
      const toast = await this.toastController.create({
        message: 'NIK harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.tempat_tgl_lahir == '') {
      const toast = await this.toastController.create({
        message: 'tempat dan tanggal lahir harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.umur == '') {
      const toast = await this.toastController.create({
        message: 'Umur harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.jenis_kelamin == '') {
      const toast = await this.toastController.create({
        message: 'Jenis kelamin harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.alamat == '') {
      const toast = await this.toastController.create({
        message: 'Alamat harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.agama == '') {
      const toast = await this.toastController.create({
        message: 'Agama harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.status_kawin == '') {
      const toast = await this.toastController.create({
        message: 'Status harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.pekerjaan == '') {
      const toast = await this.toastController.create({
        message: 'Posisi harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.posisi == '') {
      const toast = await this.toastController.create({
        message: 'Posisi harus di isi',
        duration: 2000
      });
      toast.present();

    } else {
      let body = {
        nama: this.nama,
        nik: this.nik,
        tempat_tgl_lahir: this.tempat_tgl_lahir,
        umur: this.umur,
        jenis_kelamin: this.jenis_kelamin,
        alamat: this.alamat,
        agama: this.agama,
        status_kawin: this.status_kawin,
        pekerjaan: this.pekerjaan,
        posisi: this.posisi,
        aksi: 'add_penduduk'  
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          const toast = await this.toastController.create({
            message: 'Penambahan Data Sukses.',
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });

    }
  }

}
