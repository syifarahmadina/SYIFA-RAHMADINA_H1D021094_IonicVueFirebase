**Tugas 9 Praktikum Pemrograman Mobile**

**Nama  : Syifa Rahmadina**

**NIM  : H1D021094**

**Penjelasan Autentikasi Login Sehingga Aplikasi Mendapatkan Username dan Profil dari Akun Google**



**A. Inisialisasi Firebase**

1. Aktivasi Google sebagai Provider Login di Firebase Console

   - Buka Firebase Console
  
   - Pilih menu build > authentication
  
   - Tambahkan Google Provider dan aktifkan dengan mengisi email dukungan
     
2. Konfigurasi Firebase di Aplikasi

   - Inisialisasi firebase di aplikasi melalui file firebase.ts



**B. Integrasi Google Auth**

**Login dengan Google**

1. Fungsi loginWithGoogle di auth.ts digunakan untuk login

   codenya:

    const loginWithGoogle = async () => {

          try {

                await GoogleAuth.initialize({

                clientId: '135105153048-ajb9p6vc785hi40dvh40mvnkgeihqf8i.apps.googleusercontent.com',

                scopes: ['profile', 'email'],

                grantOfflineAccess: true,

    });

            const googleUser = await GoogleAuth.signIn();

            const idToken = googleUser.authentication.idToken;

            const credential = GoogleAuthProvider.credential(idToken);

            const result = await signInWithCredential(auth, credential);

            user.value = result.user;

            router.push("/home");

   } 

   Alurnya:

   - Inisialisasi Google Auth dengan mangatur aplikasi untuk mengakses akun Google pengguna.
  
   - Login ke Google dengan cara penggunamemasukkan akun dan memberikan izin
  
   - Validasi Token ID: Token ID yang diterima digunakan untuk login ke Firebase.
  
   - Firebase mengembalikan informasi pengguna.
  


**C. Penyimpanan dan Pemantauan Status Login**


   
