
$( document ).ready(function() {

//navbar reduit
$(document).on("scroll",function(){
		if($(document).scrollTop()>100){ 
			$("header").removeClass("large").addClass("small");
			}
		else{
			$("header").removeClass("small").addClass("large");
			$("#cookie").hide();
			}
});

//logo random
var images = ["age.gif", "enfant2.gif", "femme.gif", "homme.gif","enfant.gif","infirmier2.gif","infirmier.gif", "pompier.gif", "femme2.gif"];
$('.logo span').css({'background-image': 'url(img/pix/' + images[Math.floor(Math.random() * images.length)] + ')'});


//afficheur de modale message;
affMessage = function(mess){
  $(".overlay").addClass("act");
  $(".container-fluid").addClass("act");
  $(".message").addClass("act").html(String(mess));
};
$(".overlay").on('click', function(){
  $(".act").removeClass("act");
  $(".message").html("");
});

resultos = 0;

//bouton de reload d'exemples
$("#reload").on('click', function(){
  window.location.hash = '#equivalent';
  $('#baro').hide();
  $('#calend').hide();
  $('#timo').hide();
  baro();
  calendar();
  jauge();
});

//Show apropos
$("#apropos").on('click', function(){
    affMessage("<h3>A propos</h3><p>Sim'IR est un POC en version beta d'une application qui permettrait une simulation et une compréhension de l'impot sur le revenu de manière ludique.<br>La partie equivalences a été calculée à partir de valeurs trouvées sur différents sites. Ces équivalences n'ont pas de lien direct avec l'IR et ne servent qu'à illustrer des ordres de grandeurs sur l'action des services publics en général.<br><br>Auteur : Nicolas Alliot <br><br>Dessins (pixelart) : Julien Fompeyrine<br><br>Dessins (patates pour DGFiP) repris à des fins de démo :  Martin Vidberg </p>");
});

//Show licence
$("#licence").on('click', function(){
    affMessage("<h3>Licence et code source</h3><p>L'utilisation du code n'est autorisée qu'à des fins non commerciales et à la condition de mentionner les auteurs de manière explicite selon les termes de la license consultable <a href='https:\/\/github.com\/novastra\/SIMIR\/blob\/master\/LICENSE'>ici</a>.<br><br>Projet: Sim\'IR <br>Auteur: Nicolas Alliot <br>Dessins (pixelart) : Julien Fompeyrine<br><br>Dépot code source : <a href='https:\/\/github.com\/novastra\/SIMIR'>Github Novastra</a></p>");
});


$('#valIR').on("input", function() {
  resultos = $(this).val();
      if (resultos > 0){
      $('#equivalent').fadeIn( 300 );
      baro();
      calendar();
      jauge();
    }else{ $('#equivalent').fadeOut( 300 );}
});
$('#valIR').on("keyup", function(e) {
  if (e.which == 13) this.blur();
});

  $('#resultat').fadeIn( 1000 );
  $('#valIR').focus();
  
});