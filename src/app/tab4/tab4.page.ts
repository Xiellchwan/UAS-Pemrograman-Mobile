import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  helpItems = [
    {
      icon: 'search-outline',
      title: 'Mencari Data',
      description: 'Gunakan fitur pencarian di Tab Data Penduduk dengan memasukkan NIK untuk mencari data spesifik.'
    },
    {
      icon: 'person-add-outline',
      title: 'Menambah Data',
      description: 'Klik tab Tambah Data, isi semua field yang diperlukan dengan lengkap, lalu klik tombol Simpan.'
    },
    {
      icon: 'create-outline',
      title: 'Mengubah Data',
      description: 'Klik icon mata pada data yang ingin diubah, lakukan perubahan, lalu klik tombol Simpan.'
    },
    {
      icon: 'trash-outline',
      title: 'Menghapus Data',
      description: 'Klik icon tempat sampah pada data yang ingin dihapus, konfirmasi penghapusan data.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
