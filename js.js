document.addEventListener("DOMContentLoaded", function(){
    // Oyun alanı Oluşturuldu
    var game = document.getElementsByClassName("game")[0];
    console.log(game);
    for(var m=0 ; m<20 ; m++) {
        game.insertAdjacentHTML("afterbegin" ,"<div class=\"flip-container\">\n" +
            "        <div class=\"flipper\">\n" +
            "            <div class=\"front\"></div>\n" +
            "            <div class=\"back\"></div>\n" +
            "        </div>\n" +
            "    </div>" +
            " ");
    } // (Oyun alanı)
    var flipper = document.getElementsByClassName("flipper");
    var flipContainer = document.getElementsByClassName("flip-container");
    var back = document.getElementsByClassName("back");
    var randSayi = [];
    var randSayi2 = [];
    var oyunSonu = [];
    var sayOyunSonu = 0 ;
    var bug = 0 ;
    var dataNum,geciciDataNum,geciciDataNum2,ilkTiklanan,ikinciTiklanan ;
    var count = 0 ;
// Otomatik sayı üret
    var otoSayi = function() {
        var adet = 10;
        var min = 1;
        var max = 10;

        if (adet < min || adet > max) throw 'hatalı giriş';
        var dizi = [];
        while (dizi.length < adet) {
            var rand = Math.floor(Math.random() * (max - min + 1) + min);
            if (dizi.indexOf(rand) > -1) continue;
            dizi[dizi.length] = rand;
        }
        return dizi;
    }; // (Otomatik sayı)
// Kartı döndür
    function dondur(){
        if(bug === 0 || bug === 1) { // Hızlı hızlı tıklanınca oluşan bug
            bug++ ;
            this.classList.add("cevir");
            count++ ;
            if(count === 1) {
                ilkTiklanan = this;
                geciciDataNum = ilkTiklanan.parentElement.getAttribute("data-num");
            }
            if(count === 2) {
                ikinciTiklanan = this ;
                geciciDataNum2 = ikinciTiklanan.parentElement.getAttribute("data-num");
                if(ilkTiklanan === ikinciTiklanan) {
                    ikinciTiklanan.classList.remove("cevir");
                    count = 0 ;
                    bug= 0;
                } else {
                    if(geciciDataNum === geciciDataNum2) {
                        ilkTiklanan.classList.remove("cevir");
                        ikinciTiklanan.classList.remove("cevir");
                        ilkTiklanan.classList.add("dogru");
                        ikinciTiklanan.classList.add("dogru");
                        count = 0 ;
                        bug= 0;
                    } else {
                        setTimeout(function(){
                            ilkTiklanan.classList.remove("cevir");
                            ikinciTiklanan.classList.remove("cevir");
                            count = 0;
                            bug= 0 ;
                        }, 600);
                    }
                    // Oyun bitti mi ?
                    for(var l=0 ; l<flipContainer.length ; l++){
                        oyunSonu[l] = flipper[l].classList.value ;
                        if(oyunSonu[l].includes("dogru")) {
                            sayOyunSonu ++ ;
                            if(sayOyunSonu === 20) {
                                setTimeout(function(){
                                    alert(" Tebrikler Kazandınız :) ")
                                }, 300);
                            }
                        }
                        console.log("Sayılan Oyun Sonu => " + sayOyunSonu);
                    } sayOyunSonu = 0 ; console.log("Olmadı Oyun Sonu => " + sayOyunSonu) ;
                }
            }
        }
    } // (Kartı Döndür)
// Data-num ve resimleri oluştur
    randSayi = otoSayi();
    randSayi2 = otoSayi();
    for(var i=0 ; i<flipContainer.length ; i++) {
        if(i>9) {
            flipContainer[i].setAttribute("data-num" , randSayi[i-10] );
            dataNum = flipContainer[i].getAttribute("data-num");
            back[i].innerHTML = "<img src='image/image" + (dataNum-1) + ".png'>" ;
        } else {
            flipContainer[i].setAttribute("data-num" , randSayi2[i]);
            dataNum = flipContainer[i].getAttribute("data-num");
            back[i].innerHTML = "<img src='image/image" + (dataNum-1) + ".png'>" ;
        }
        flipper[i].onclick = dondur;
    }
}); // (Data-num ve Resimler)