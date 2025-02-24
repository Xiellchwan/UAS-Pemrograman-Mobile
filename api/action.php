<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php";
$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch($aksi)
{
    case "add_penduduk":
        $nama             = filter_var($postjson['nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $nik              = filter_var($postjson['nik'], FILTER_SANITIZE_NUMBER_INT);
        $tempat_tgl_lahir = filter_var($postjson['tempat_tgl_lahir'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $umur             = filter_var($postjson['umur'], FILTER_SANITIZE_NUMBER_INT);
        $jenis_kelamin    = filter_var($postjson['jenis_kelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $alamat           = filter_var($postjson['alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $agama            = filter_var($postjson['agama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $status_kawin     = filter_var($postjson['status_kawin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $pekerjaan        = filter_var($postjson['pekerjaan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $posisi           = filter_var($postjson['posisi'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $sql = "INSERT INTO penduduk (nik, nama, tempat_tgl_lahir, umur, jenis_kelamin, alamat, agama, status_kawin, pekerjaan, posisi) 
                    VALUES (:nik, :nama, :tempat_tgl_lahir, :umur, :jenis_kelamin, :alamat, :agama, :status_kawin, :pekerjaan, :posisi)";
                       $stmt = $pdo->prepare($sql);
                       $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
                       $stmt->bindParam(':nik', $nik, PDO::PARAM_INT);
                       $stmt->bindParam(':tempat_tgl_lahir', $tempat_tgl_lahir, PDO::PARAM_STR);
                       $stmt->bindParam(':umur', $umur, PDO::PARAM_INT);
                       $stmt->bindParam(':jenis_kelamin', $jenis_kelamin, PDO::PARAM_STR);
                       $stmt->bindParam(':alamat', $alamat, PDO::PARAM_STR);
                       $stmt->bindParam(':agama', $agama, PDO::PARAM_STR);
                       $stmt->bindParam(':status_kawin', $status_kawin, PDO::PARAM_STR);
                       $stmt->bindParam(':pekerjaan', $pekerjaan, PDO::PARAM_STR);
                       $stmt->bindParam(':posisi', $posisi, PDO::PARAM_STR);
                       $stmt->execute();
           

            if ($sql) {
                $result = json_encode(array('success' => true));
            } else {
                $result = json_encode(array('success' => false, 'msg' => 'Error, please try again'));
            }
            echo $result;
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    break;

    case "get_penduduk":
        $limit = filter_var($postjson['limit'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $start = filter_var($postjson['start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        try {
            $sql = "SELECT * FROM penduduk ORDER BY id DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = array(
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'nik' => $row['nik'],
                    'tempat_tgl_lahir' => $row['tempat_tgl_lahir'],
                    'umur' => $row['umur'],
                    'jenis_kelamin' => $row['jenis_kelamin'],
                    'alamat' => $row['alamat'],
                    'agama' => $row['agama'],
                    'status_kawin' => $row['status_kawin'],
                    'pekerjaan' => $row['pekerjaan'],
                    'posisi' => $row['posisi']
                    
                );
            }
            if($stmt) $result = json_encode(array('success'=>true,
            'result'=>$data));
        else $result = json_encode(array('success'=>false));
            echo $result;
            } 
        catch(PDOException $e) 
        {
            echo $e->getMessage();
        }
    break;

   

    case "search_penduduk":
        try {
            $searchTerm = filter_var($postjson['searchTerm'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $sql = "SELECT * FROM penduduk WHERE nik LIKE :searchTerm ORDER BY id DESC";
            $stmt = $pdo->prepare($sql);
            $searchPattern = "%{$searchTerm}%";
            $stmt->bindParam(':searchTerm', $searchPattern, PDO::PARAM_STR);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $data = array();
            foreach ($rows as $row) {
                $data[] = array(
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'nik' => $row['nik'],
                    'tempat_tgl_lahir' => $row['tempat_tgl_lahir'],
                    'umur' => $row['umur'],
                    'jenis_kelamin' => $row['jenis_kelamin'],
                    'alamat' => $row['alamat'],
                    'agama' => $row['agama'],
                    'status_kawin' => $row['status_kawin'],
                    'pekerjaan' => $row['pekerjaan'],
                    'posisi' => $row['posisi']
                );
            }
            
            if ($stmt) {
                $result = json_encode(array('success' => true, 'result' => $data));
            } else {
                $result = json_encode(array('success' => false, 'msg' => 'Tidak ada data ditemukan'));
            }
            echo $result;
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
    break;

    case "delete_penduduk":
        try {
            $id = filter_var($postjson['id'], FILTER_SANITIZE_NUMBER_INT);
            
            $sql = "DELETE FROM penduduk WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            
            if ($stmt) {
                $result = json_encode(array('success' => true));
            } else {
                $result = json_encode(array('success' => false, 'msg' => 'Gagal menghapus data'));
            }
            echo $result;
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
    break;

    case "update_penduduk":
        try {
            $id = filter_var($postjson['id'], FILTER_SANITIZE_NUMBER_INT);
            $nama = filter_var($postjson['nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $nik = filter_var($postjson['nik'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $jenis_kelamin = filter_var($postjson['jenis_kelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $umur = filter_var($postjson['umur'], FILTER_SANITIZE_NUMBER_INT);
            $alamat = filter_var($postjson['alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $posisi = filter_var($postjson['posisi'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $pekerjaan = filter_var($postjson['pekerjaan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            $sql = "UPDATE penduduk SET 
                    nama = :nama,
                    nik = :nik,
                    jenis_kelamin = :jenis_kelamin,
                    umur = :umur,
                    alamat = :alamat,
                    posisi = :posisi,
                    pekerjaan = :pekerjaan
                    WHERE id = :id";
                    
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
            $stmt->bindParam(':nik', $nik, PDO::PARAM_STR);
            $stmt->bindParam(':jenis_kelamin', $jenis_kelamin, PDO::PARAM_STR);
            $stmt->bindParam(':umur', $umur, PDO::PARAM_INT);
            $stmt->bindParam(':alamat', $alamat, PDO::PARAM_STR);
            $stmt->bindParam(':posisi', $posisi, PDO::PARAM_STR);
            $stmt->bindParam(':pekerjaan', $pekerjaan, PDO::PARAM_STR);
            $stmt->execute();
            
            if ($stmt) {
                $result = json_encode(array('success' => true));
            } else {
                $result = json_encode(array('success' => false, 'msg' => 'Gagal memperbarui data'));
            }
            echo $result;
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
    break;

    case "get_statistik_penduduk":
        try {
            // Query untuk total penduduk
            $sql_total = "SELECT COUNT(*) as total FROM penduduk";
            $stmt_total = $pdo->prepare($sql_total);
            $stmt_total->execute();
            $total = $stmt_total->fetch(PDO::FETCH_ASSOC)['total'];

            // Query untuk total kepala keluarga
            $sql_kk = "SELECT COUNT(*) as total_kk FROM penduduk WHERE posisi = 'Kepala Keluarga'";
            $stmt_kk = $pdo->prepare($sql_kk);
            $stmt_kk->execute();
            $total_kk = $stmt_kk->fetch(PDO::FETCH_ASSOC)['total_kk'];

            // Query untuk total pria dan wanita
            $sql_gender = "SELECT jenis_kelamin, COUNT(*) as jumlah 
                          FROM penduduk 
                          GROUP BY jenis_kelamin";
            $stmt_gender = $pdo->prepare($sql_gender);
            $stmt_gender->execute();
            $gender_counts = $stmt_gender->fetchAll(PDO::FETCH_ASSOC);

            // Menyiapkan data statistik
            $statistik = array(
                'total_penduduk' => $total,
                'total_kk' => $total_kk,
                'total_pria' => 0,
                'total_wanita' => 0
            );

            foreach ($gender_counts as $count) {
                if ($count['jenis_kelamin'] == 'LAKI-LAKI') {
                    $statistik['total_pria'] = $count['jumlah'];
                } else if ($count['jenis_kelamin'] == 'PEREMPUAN') {
                    $statistik['total_wanita'] = $count['jumlah'];
                }
            }

            echo json_encode(array('success' => true, 'result' => $statistik));
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
    break;

    case "login":
        try {
            $username = filter_var($postjson['username'], FILTER_SANITIZE_STRING);
            $password = filter_var($postjson['password'], FILTER_SANITIZE_STRING);
            
            $sql = "SELECT * FROM users WHERE username = :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && $user['password'] === $password) {
                $result = json_encode(array(
                    'success' => true,
                    'user' => array(
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'nama_lengkap' => $user['nama_lengkap']
                    )
                ));
            } else {
                $result = json_encode(array(
                    'success' => false,
                    'msg' => 'Username atau password salah'
                ));
            }
            echo $result;
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
    break;
}
