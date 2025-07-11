let sepet = [];
let toplam = 0;

document.querySelectorAll('.arttir').forEach(button => {
  button.addEventListener('click', function() {
    const miktarElement = this.parentElement.querySelector('.miktar');
    miktarElement.textContent = parseInt(miktarElement.textContent) + 1;
  });
});

document.querySelectorAll('.azalt').forEach(button => {
  button.addEventListener('click', function() {
    const miktarElement = this.parentElement.querySelector('.miktar');
    const current = parseInt(miktarElement.textContent);
    if (current > 1) {
      miktarElement.textContent = current - 1;
    }
  });
});

document.querySelectorAll('.sepete-ekle').forEach(button => {
  button.addEventListener('click', function() {
    const urunDiv = this.closest('.urun');
    const miktar = parseInt(urunDiv.querySelector('.miktar').textContent);
    const urunAdi = this.getAttribute('data-urun');
    const urunFiyati = parseInt(this.getAttribute('data-fiyat'));
    const toplamFiyat = urunFiyati * miktar;

    const existingIndex = sepet.findIndex(item => item.ad === urunAdi);
    if (existingIndex !== -1) {
      sepet[existingIndex].miktar += miktar;
      sepet[existingIndex].toplamFiyat += toplamFiyat;
    } else {
      sepet.push({
        ad: urunAdi,
        fiyat: urunFiyati,
        miktar: miktar,
        toplamFiyat: toplamFiyat
      });
    }

    toplam += toplamFiyat;
    guncelleSepet();
  });
});

function guncelleSepet() {
  const sepetListesi = document.getElementById('sepet-listesi');
  const toplamElement = document.getElementById('toplam');
  
  sepetListesi.innerHTML = '';
  sepet.forEach(urun => {
    const li = document.createElement('li');
    li.textContent = `${urun.ad} x${urun.miktar} - ${urun.toplamFiyat} TL`;
    sepetListesi.appendChild(li);
  });
  
  toplamElement.textContent = `Toplam: ${toplam} TL`;
}

document.getElementById('siparis-tamamla').addEventListener('click', function() {
  if (sepet.length === 0) {
    alert('Sepetiniz boş!');
    return;
  }
  
  localStorage.setItem('sepet', JSON.stringify(sepet));
  localStorage.setItem('toplam', toplam);
  window.location.href = 'odeme.html';
});