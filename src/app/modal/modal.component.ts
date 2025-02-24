import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() penduduk: any;

  constructor(
    private modalController: ModalController,
    private postProvider: PostProvider,
    private toastController: ToastController
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async updatePenduduk() {
    const data = {
      aksi: 'update_penduduk',
      id: this.penduduk.id,
      nama: this.penduduk.nama,
      nik: this.penduduk.nik,
      jenis_kelamin: this.penduduk.jenis_kelamin,
      umur: this.penduduk.umur,
      alamat: this.penduduk.alamat,
      posisi: this.penduduk.posisi,
      pekerjaan: this.penduduk.pekerjaan,
    };

    this.postProvider.postData(data, 'action.php').subscribe(async response => {
      const toast = await this.toastController.create({
        message: response.success ? 'Data berhasil diperbarui' : 'Gagal memperbarui data',
        duration: 2000
      });
      toast.present();

      if (response.success) {
        this.closeModal();
      }
    }, async error => {
      const toast = await this.toastController.create({
        message: 'Error: ' + error,
        duration: 2000
      });
      toast.present();
    });
  }
}
