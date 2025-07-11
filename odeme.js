document.addEventListener('DOMContentLoaded', function() {
  const sepet = JSON.parse(localStorage.getItem('sepet'));
  const toplam = localStorage.getItem('toplam');
  
  const sepetBilgisi = document.createElement('div');
  sepetBilgisi.className = 'sepet-ozeti';
  sepetBilgisi.innerHTML = `
    <h3>Sipariş Özeti</h3>
    <ul>
      ${sepet.map(urun => `<li>${urun.ad} x${urun.miktar} - ${urun.toplamFiyat} TL</li>`).join('')}
    </ul>
    <p><strong>Toplam: ${toplam} TL</strong></p>
  `;
  
  document.querySelector('.odeme-formu').prepend(sepetBilgisi);

  document.getElementById('odeme-formu').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // MEB tarzı başarı mesajı
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div class="success-content">
        <h3>Siparişiniz başarıyla gerçekleştirilmiştir</h3>
        <p>Sipariş numaranız: #${Math.floor(Math.random() * 1000000)}</p>
        <p>En kısa sürede kargoya verilecektir iyi günler dileriz</p>
        <p>-YILDIZ LİMİTED</p>
        <button id="ana-sayfa">Ana Sayfaya Dön</button>
      </div>
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(successDiv);
    
    document.getElementById('ana-sayfa').addEventListener('click', function() {
      localStorage.removeItem('sepet');
      localStorage.removeItem('toplam');
      window.location.href = 'index.html';
    });
  });
});