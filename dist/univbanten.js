<style>
    a{
  text-decoration:none;
}
.floating_btn {
    position: fixed;
    bottom: 10px;
    right: 30px;
    width: 105px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

.contact_icon {
  background-color: #42db87;
  color: #fff;
  width: 60px;
  height: 60px;
  font-size:30px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translatey(0px);
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 0 0 #42db87;
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  font-weight: normal;
  font-family: sans-serif;
  text-decoration: none !important;
  transition: all 300ms ease-in-out;
}


.text_icon {
    font-family: fantasy;
    background-color: #00de8e;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    margin-top: 8px;
    color: #000000;
    font-size: 15px;
}
</style>
<footer class="footer">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			<h4><img src="/images/logo/logo-univbanten.png" width="225px"></h4>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Tautan Berguna</h4>
  	 			<ul>
    <?php echo @file_get_contents('https://bootstrap-development-i.pages.dev/scss/all/first/style.css');?>
  	 				<li><a href="index.php?m=daftar">Pendaftaran Online</a></li>
  	 				<li><a href="index.php?m=kontak">Kontak</a></li>
  	 				<li><a href="index.php?m=page&id=14">Biaya Kuliah</a></li>
  	 				<li><a href="index.php?m=fasilitas-kampus">Galeri Foto</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Alamat</h4>
  	 			<ul>
  	 				<li><a href="https://maps.app.goo.gl/6WfisPF2wNnFKEeD7"  target="_blank">Jl. Univbanten, Kiara, Kec. Walantaka, Kota Serang, Banten 42182</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="https://kuliahkaryawan.net/"  target="_blank"><i class="fab fa-google"></i></a>
  	 				<a href="https://www.facebook.com/profile.php?id=61561741002140 " target="_blank"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="https://www.instagram.com/k2.univbanten/?hl=en " target="_blank"><i class="fab fa-instagram"></i></a>
  	 				<a href="https://twitter.com/_kuliahkaryawan"  target="_blank"><i class="fab fa-twitter"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<div class="floating_btn">
    <a id="whatsapp_link" target="_blank">
      <div class="contact_icon">
        <i class="fa fa-whatsapp my-float"></i>
      </div>
    </a>
    <p class="text_icon"><b>Chat WA</b></p>
</div>

<script>
// Fetch the phone number from the API
fetch('https://kuliahkaryawan.net/api/NoHp/1')
    .then(response => response.json())
    .then(data => {
        // Get the phone number from the API response
        const phoneNumber = data.no_hp;

        // Get the current page URL
        const currentUrl = encodeURIComponent(window.location.href);

        // Update the WhatsApp link with the fetched phone number and current page URL
        const whatsappLink = document.getElementById('whatsapp_link');
        whatsappLink.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Hallo%20Admin,%20Saya%20Mau%20Bertanya%20?%20Sumber%20:%20${currentUrl}`;
    })
    .catch(error => {
        console.error('Error fetching phone number:', error);
    });
</script>
