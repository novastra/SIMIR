//a supprimer et harmoniser ds v2

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

var resultos = 0;


// Maj de la jauge de temps
var jauge = function(){
  $('#timo').fadeIn(300);

  var possibJauge = [
  {ID:'1', eur:'6200', temps:'110', min:'56.3636', metier:'infirmier', descr:'opération de l\'appendicite', source:'http:\/\/www.insee.fr\/fr\/themes\/theme.asp?theme=6&sous_theme=3'},  
  {ID:'2', eur:'2500', temps:'30', min:'83.3333', metier:'infirmier2', descr:'opération des amygdales', source:'http:\/\/www.insee.fr\/fr\/themes\/theme.asp?theme=6&sous_theme=3'},  
  {ID:'3', eur:'8000', temps:'60', min:'133.3333', metier:'docteur', descr:'pose de prothèse de hanche', source:'http:\/\/www.insee.fr\/fr\/themes\/theme.asp?theme=6&sous_theme=3'}, 
  {ID:'4', eur:'50000', temps:'300', min:'166.6667', metier:'docteur', descr:'greffe du cœur', source:'http:\/\/www.insee.fr\/fr\/themes\/theme.asp?theme=6&sous_theme=3'}
  ];  

  var vizu = possibJauge[Math.floor(Math.random() * possibJauge.length)]; //exemple retenu
  var ratioo = resultos / parseInt(vizu.eur);
  
  //si + d'un seul element afficher le temps complet et le ratio
  if (Math.floor(ratioo) > 1){
    var x = 1;
    var descr = vizu.descr.split(' ')[0] + "s"; //pluriel
    while ( x <= (vizu.descr.split(' ').length - 1) ) {
      descr += " " + vizu.descr.split(' ')[x];
      x++;  
    };      
    $('#timoDescr').html(Math.round(ratioo) + " " + descr + " (" + vizu.eur + "€)");
    var percentos = vizu.temps;
  }
  //si - d'un seul element afficher le % de temps complet
  else{
    $('#timoDescr').html("d'une " + vizu.descr + " (" + vizu.temps + "minutes - " + vizu.eur + "€)");
    var percentos = Math.round(resultos / vizu.min); //nb de minutes avec IR
  }
  var radios = percentos;

  // temps affiché par jauge
  if (radios <= 60){
    $(".radial-progress .circle .mask .fill").css({"background-color": "#97A71D"});
  }
  else if (radios > 120){ 
    $(".radial-progress .circle .mask .fill").css({"background-color": "#E03622"});
    var radios = 60;
  }
  else if (radios > 60) {
    $(".radial-progress .circle .mask .fill").css({"background-color": "#FE7400"});
    var radios = 60;
  }

  var rotRad = 360 * (radios / 60); //degré rad
  $("#tempos").html(percentos + " min"); 
  $('#timoSource').html("Source : " + vizu.source).attr("href", vizu.source).attr('target','_blank'); 
  $(".fill.fix").css({"transform": "rotate(" + rotRad + "deg"});
  $(".mask.full, .fill").css({"transform": "rotate(" + (rotRad/2) + "deg"});
};

//barre de visualisation
var baro = function(){
  $('#baro').fadeIn(400);

  var possibBar = [
  {ID:'7', eur:'1635', metier:'pompier', descr:'sapeur de 1ère classe (salaire mensuel net', source:'http:\/\/infos.emploipublic.fr\/metiers\/les-secteurs-qui-recrutent\/pompiers-les-metiers-de-la-securite-civile\/combien-gagne-un-sapeur-pompier-professionnel\/apm-3614\/'},
  {ID:'14', eur:'2016', metier:'age', descr:'professeur des écoles (salaire mensuel net', source:'http:\/\/www.education.gouv.fr\/cid1052\/professeur-des-ecoles.html'},  
  {ID:'15', eur:'7445', metier:'doc', descr:'médecin hospitalier (salaire mensuel net', source:'http:\/\/www.emploi-pro.fr\/edito\/article\/le-salaire-moyen-des-medecins-hospitaliers-est-de-89-339-euros-par-an-aea-2192'}
  ];

  var vizu = possibBar[Math.floor(Math.random() * possibBar.length)]; //exemple retenu
  var ratioo = resultos / vizu.eur; //rapport entre IR et salaire mensuel de l'exemple
  var i = 0;
  var contenoo = '';

  while ( i <= ratioo ){
    contenoo += "<li><img src='img/pix/" + vizu.metier + ".gif'/></li>";
    i++;  
  };

  //pluriel
  if (ratioo > 1){
    var x = 1;
    var descr = vizu.descr.split(' ')[0] + "s";
    while ( x <= (vizu.descr.split(' ').length - 1) ) {
      descr += " " + vizu.descr.split(' ')[x];
      x++;  
    };  
  }
  else{
    var descr = vizu.descr;
  }

  $("#baro ul").html(contenoo);
  $("#baro ul li img").css({"height": 960/ratioo + "px"});
  $('#baroDescr').html(Math.ceil(ratioo) + " " + descr + " x " + ratioo.toFixed(2) + ")");
  $('#baroSource').html("Source : " + vizu.source).attr("href", vizu.source).attr('target','_blank');
};


//calendrier
var calendar = function(){
$('#calend').fadeIn(500);

var possibCal = [
{ID:'8', eur:'4970', HpJ: '6', temps:'51840', min:'0.0959', metier:'enfant2', descr:'de cours pour un élève en pré-élémentaire', source:'http:\/\/www.education.gouv.fr\/cid11\/le-cout-d-une-scolarite.html'},
{ID:'9', eur:'5440', HpJ: '6', temps:'51840', min:'0.1049', metier:'enfant', descr:'de cours pour un élève en élémentaire', source:'http:\/\/www.education.gouv.fr\/cid11\/le-cout-d-une-scolarite.html'},
{ID:'10', eur:'7930', HpJ: '10.6', temps:'114480', min:'0.0693', metier:'femme', descr:'de cours pour un élève au collège', source:'http:\/\/www.education.gouv.fr\/cid11\/le-cout-d-une-scolarite.html'},
{ID:'11', eur:'10240', HpJ: '14', temps:'151200', min:'0.0677', metier:'femme2', descr:'de cours pour un élève au lycée', source:'http:\/\/www.education.gouv.fr\/cid11\/le-cout-d-une-scolarite.html'}
];

var vizu = possibCal[Math.floor(Math.random() * possibCal.length)]; //exemple retenu
var baseH = (resultos / vizu.min) / 60; // combien d'heures pour l'ir 
var jourS = baseH / vizu.HpJ; //cb de jour à partir de la base Heures par Jour de chaque exemple (pas 24h)
var heureS = baseH % vizu.HpJ; // cb d'heures restantes - modulo 
var minS = (heureS % 1) * 60; // cb de minutes restantes - modulo 

$('#jours').html(parseInt(jourS));
$('#heures').html(parseInt(heureS));
$('#minutes').html(parseInt(minS));
$('#calenDescr').html(vizu.descr + "<img src='img/pix/" + vizu.metier + ".gif'/>");
$('#calenSource').html("Source : " + vizu.source).attr("href", vizu.source).attr('target','_blank');

$('#calend div:nth-child(1)').fadeIn( 1000 );
$('#calend div:nth-child(2)').fadeIn( 1500 );
$('#calend div:nth-child(3)').fadeIn( 2000 );
};

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
