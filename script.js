// ===== AMBIL WAKTU WIB =====
function getWIBTime(){
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (7 * 60 * 60 * 1000));
}

// ===== CEK TARGET DATE =====
let targetDate = localStorage.getItem("garansiHabis");

if(!targetDate){
    let start = getWIBTime();
    let target = new Date(start);
    target.setMonth(target.getMonth() + 1);

    targetDate = target.getTime();
    localStorage.setItem("garansiHabis", targetDate);
}else{
    targetDate = parseInt(targetDate);
}

// ===== UPDATE COUNTDOWN =====
function updateCountdown(){

    let now = getWIBTime().getTime();
    let distance = targetDate - now;

    if(distance <= 0){
        document.getElementById("days").innerHTML = "";
        document.getElementById("countdown").innerHTML = "Garansi Habis";
        return;
    }

    let days = Math.floor(distance / (1000*60*60*24));
    let hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    let minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("days").innerHTML = days + " Hari";

    document.getElementById("countdown").innerHTML =
        String(hours).padStart(2,"0") + " : " +
        String(minutes).padStart(2,"0") + " : " +
        String(seconds).padStart(2,"0");
}

// ===== JALANKAN =====
updateCountdown();
setInterval(updateCountdown,1000);

// ===== DATA TERSEMBUNYI =====
const namaUser = "Ahmad septian";
const passkeyUser = "aob156a";
const passwordBenar = "ns11garansi";

let salah = 0;
let bannedUntil = 0;


// ===== BUKA POPUP =====
function bukaPopup(){

let now = Date.now();

if(now < bannedUntil){
let sisa = Math.ceil((bannedUntil-now)/1000);
alert("Anda dibanned sementara\nTunggu "+sisa+" detik");
return;
}

document.getElementById("popup").style.display = "flex";

}


// ===== TUTUP POPUP =====
function tutupPopup(){

document.getElementById("popup").style.display = "none";

}


// ===== CEK PASSWORD =====
function cekPassword(){

let input = document.getElementById("pwInput").value;

if(input === passwordBenar){

// tampilkan biodata
document.getElementById("nama").innerHTML = "<b>Nama:</b> " + namaUser;
document.getElementById("passkey").innerHTML = "<b>Passkey:</b> " + passkeyUser;

document.getElementById("biodata").style.display = "block";

document.getElementById("popup").style.display = "none";

document.getElementById("pwInput").value = "";

salah = 0;

}else{

salah++;

if(salah >= 3){

bannedUntil = Date.now() + (3*60*1000);
salah = 0;

alert("Terlalu banyak kesalahan!\nBanned 3 menit");

}else{

alert("Password salah!");

}

}

}