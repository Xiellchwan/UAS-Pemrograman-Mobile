-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 13, 2025 at 05:03 PM
-- Server version: 10.6.20-MariaDB-cll-lve
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xwbxkukt_abid`
--

-- --------------------------------------------------------

--
-- Table structure for table `penduduk`
--

CREATE TABLE `penduduk` (
  `id` int(100) NOT NULL,
  `nik` bigint(16) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tempat_tgl_lahir` varchar(50) NOT NULL,
  `umur` int(3) NOT NULL,
  `jenis_kelamin` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `agama` varchar(20) NOT NULL,
  `status_kawin` text NOT NULL,
  `pekerjaan` varchar(50) NOT NULL,
  `posisi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penduduk`
--

INSERT INTO `penduduk` (`id`, `nik`, `nama`, `tempat_tgl_lahir`, `umur`, `jenis_kelamin`, `alamat`, `agama`, `status_kawin`, `pekerjaan`, `posisi`) VALUES
(27, 1122334455667780, 'Muhammad Lil Abidsyah', 'Hinai, 25 Juli 2004', 20, 'LAKI-LAKI', 'Hinai Kanan', 'ISLAM', 'SUDAH MENIKAH', 'Data', 'KEPALA KELUARGA'),
(28, 1122334455667781, 'Jessica Citra Ayu', 'Tamaran 14 Agustus 2004', 20, 'PEREMPUAN', 'Tamaran', 'ISLAM', 'SUDAH MENIKAH', 'IRT', 'ANGGOTA KELUARGA'),
(29, 1234567890123456, 'Muhammad Rafiq', '18 Agustus 2008', 16, 'LAKI-LAKI', 'Hinai Kanan', 'ISLAM', 'BELUM MENIKAH', 'Pelajar', 'ANGGOTA KELUARGA'),
(30, 1234567890123456, 'Armansyah', '23 Juli 1982', 40, 'LAKI-LAKI', 'Hinai Kanan', 'ISLAM', 'SUDAH MENIKAH', 'Petani', 'KEPALA KELUARGA'),
(31, 12345678901234, 'Fatanah', 'Hinai Kanan 21 januari 1984', 36, 'PEREMPUAN', 'Hinai Kanan', 'ISLAM', 'SUDAH MENIKAH', 'IRT', 'ANGGOTA KELUARGA'),
(32, 1234567890123456, 'Ahmad Yasin', 'Hinai, 20 Agustus 2002', 22, 'LAKI-LAKI', 'Hinai Kanan', 'ISLAM', 'SUDAH MENIKAH', 'Freelance', 'ANGGOTA KELUARGA');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nama_lengkap`) VALUES
(1, 'abid', '123', 'Muhammad Lil Abidsyah'),
(2, 'jessica', '123', 'Jessika Citra Ayu'),
(3, 'panji', '123', 'Panji Syahputra');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `penduduk`
--
ALTER TABLE `penduduk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `penduduk`
--
ALTER TABLE `penduduk`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
