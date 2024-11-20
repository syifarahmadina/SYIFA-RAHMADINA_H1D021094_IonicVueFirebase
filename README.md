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


**1. Firebase Auth State**

- Firebase memantau status login menggunakan onAuthStateChanged

  Codenya:

  onAuthStateChanged(auth, (currentUser) => {

   user.value = currentUser; 

});

- Fungsi ini bekerja untuk memastikan data pengguna selalu sinkron dari awal login sampai logout


**2. Pinia Store untuk Status LOgin**

- Data pengguna dan status autentikasi disimpan di pinia

  Code:

  const user = ref<User | null>(null); // Data pengguna

   const isAuth = computed(() => user.value !== null); // Status login (true/false)



**D. Implementasi di Tampilan (Views)


**1. Login Page (LoginPage.vue)**

- Halaman login memuat tombol untuk autentikasi Google

  Codenya:

  <ion-button @click="login" color="light">

   <ion-icon slot="start" :icon="logoGoogle"></ion-icon>

    <ion-label>Sign In with Google</ion-label>

</ion-button>

SS Gambarnya:

![Screenshot (4242)](https://github.com/user-attachments/assets/4c8c984d-6aeb-42ab-a78b-b09d4ac01543)

Ketika tombol ditekan maka akan memanggil loginWithGoogle

![Screenshot (4243)](https://github.com/user-attachments/assets/1933d03a-059b-4b1b-8d63-b07ec8340b0f)

Proses Selanjutnya:

![Screenshot (4244)](https://github.com/user-attachments/assets/d71558fc-005c-4f66-95aa-fc44429cbc3b)

Menunggu Proses:

![Screenshot (4245)](https://github.com/user-attachments/assets/bde80d76-8c56-4a43-8ce6-ac45e97b3a54)


**2. Home Page (HomePage.vue)**

- Proteksi akun ketika halaman hanya diakses jika pengguna sudah login, hal ini di autentikasi dengan router dnegan code:

if (to.meta.isAuth && !authStore.isAuth) {
    
    next('/login'); // Arahkan kembali ke Login jika belum autentikasi

}

SS Kodenya:

![Screenshot (4246)](https://github.com/user-attachments/assets/d590be9e-ad6a-4bb9-ae53-484e7373d9fc)


**3. Profil Page (ProfilPage.vue)**

- Menampilkan informasi pengguna dengan code:

  <ion-avatar>
   
     <img alt="Avatar" :src="userPhoto" />

</ion-avatar>

<ion-item>

   <ion-input label="Nama" :value="user?.displayName" readonly></ion-input>

</ion-item>

<ion-item>

   <ion-input label="Email" :value="user?.email" readonly></ion-input>

</ion-item>

Data ini diambil dari firebase auth dnegan user.displayname, user.email dan juga user.photoUrl

SS Gambarnya:

![Screenshot (4248)](https://github.com/user-attachments/assets/4761123b-b401-4da8-ad0c-a58e7012dc52)


**4. Logout**

Codenya:

const logout = async () => {
  
    await signOut(auth); // Hapus sesi di Firebase
    
    await GoogleAuth.signOut(); // Hapus sesi di Google
    
    user.value = null; // Hapus data pengguna
    
    router.replace('/login'); // Kembali ke halaman login

};



**E. Alur Router**

Router mengecek status autentikasi pengguna sebelum mengizinkan akses ke halaman tertentu

Codenya:

router.beforeEach(async (to, from, next) => {

    if (to.meta.isAuth && !authStore.isAuth) {
    
        next('/login'); // Redirect ke Login jika belum autentikasi
    
    } else {
    
        next(); // Lanjutkan navigasi
    
    }

});

SS Gambarnya:

![Screenshot (4244)](https://github.com/user-attachments/assets/8a378742-eee2-4f91-855a-88b56eb83737)







   
