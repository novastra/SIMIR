//Made listening to Dynatron - Intergalactic highway

//######## init de la situation du foyer ########
var annee = new Date().getFullYear();
var resultos = 0;
var salairos = 0;
var foncios = 0;
var boursos = 0;
var adultos = 0;
var enfantos = 0;
var situatios = "C"; //celibataire par défaut

// ######## SETUP de l'app ########
$( document ).ready(function() {
    
  // fx jquery drag and drop 
  $( "#shopElements li.situation" ).hide();
  $( "#shopElements li.enfant" ).hide();
  $( "#shopElements li.revenu" ).hide();

  $( "#shopElements li" ).draggable({
    cancel: ".descr, .euro, .mont, .modMont",
    opacity: 0.7,
    appendTo: "body",
    containment: "#foyer", 
    scroll: false, 
    helper: function(event) {
      return $(event.target).clone().css({
        width: 80,
        height: 150,
        margin: 0
      });
    },
    revert: "invalid",
    cursor: "grabbing", 
    cursorAt: { 
      top: 0, 
      right: 40 
    },
    start: function(e, ui){
      $(ui.helper).addClass("animat");
    }
  });

  $( "#contFoyer" ).droppable({
    activeClass: "canDrop",
    hoverClass: "hovDrop",
    accept: ":not(.ui-sortable-helper)",
    drop: function( event, ui ) {
      //style
      var itemToClone = $(ui.draggable);
      $( this ).find( ".placeholder" ).remove();
      $(this).append(itemToClone.clone().css({
        width: 80,
        height: 150,
        margin: 10
      }).append( "<button type='button' class='closos' onclick='supprElem(this)'><span class='glyphicon glyphicon-remove'></span></button>"));       
      //calcul 
      calculat();
    }
  }).sortable({
    items: "li:not(.placeholder)",
    sort: function() {
      // fix droppable interacting with sortable
      $( this ).removeClass( "ui-state-default" );
    }
  });

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

  //Toggle pour demo avec images Patates
  $("#patate").on('click', function(){
    $(".ui-draggable").toggleClass("patate");
    $(".logo span").toggleClass("patate");
  });

  //bloque la saisie de texte dans input revenus
  document.querySelector("input.mont").addEventListener("keyup", function () {
    this.value = this.value.replace(/\D/, "")
  });

  //refresh de l'input montant et attribut data-val
  $('input.mont').on('keyup blur mouseleave', function(e) {
    var value = $( this ).val();
    $( this ).parents("li").data("val", value).attr("data-val", value);
  });

  //desactive le span euro pour webkit car bug, a revoir avec div input de BS
  if ('WebkitAppearance' in document.documentElement.style){$(".euro").remove()};
  
  //maintien touche pour incrementer revenus
  var to = null;
  var inte = null;

  $(".plus").on("mousedown", function () {
    var champMont = $( this ).siblings('input.mont'); //obligatoire pour maj rapide du DOM par Jquery
    var elemMont = $( this ).parents("li");
    var valo = champMont.val();
    valo = parseInt(valo) + 100;
    champMont.val(valo);
    elemMont.data("val", valo).attr("data-val", valo);
    to = setTimeout(function () {
      inte = setInterval(function () {
        valo = parseInt(valo) + 100;
        champMont.val(valo);
        elemMont.data("val", valo).attr("data-val", valo);
      }, 25);
    }, 500);
  }).on("mouseup", function () {
    clearTimeout(to);
    clearInterval(inte);
  });

  $(".moins").on("mousedown", function () {
    var champMont = $( this ).siblings('input.mont'); 
    var elemMont = $( this ).parents("li");
    var valo = champMont.val();
    valo = parseInt(valo) - 100;
    if (valo < 0){
      valo = 0;
    };
    champMont.val(valo);
    elemMont.data("val", valo).attr("data-val", valo);
    to = setTimeout(function () {
      inte = setInterval(function () {
        valo = parseInt(valo) - 100;
        if (valo < 0){
          valo = 0;
        };
        champMont.val(valo);
        elemMont.data("val", valo).attr("data-val", valo);
      }, 25);
    }, 500);
  }).on("mouseup", function () {
    clearTimeout(to);
    clearInterval(inte);
  });

  //btn d'accès aux equivalences IR // voir autre fx plugin onview
  $("#shEquiv").on('click', function(){
    $('#equivalent').fadeIn( 500 );
    $('#shEquiv, .trigSep, .trigView').remove(); //remove les elements d'acces a equiv
    baro();
    calendar();
    jauge();
  });

  //affichage détails du foyer
  $("#detFoyer").on('click', function(){
    affMessage("<h3>Votre foyer</h3><br><ul><li>Nombre d'adultes : "+ adultos +" </li><li>Nombre d'enfants : "+ enfantos +" </li><li>Situation : "+ situatios +" </li><li>Revenus : <ul><li>Salaires : "+ salairos +" €</li><li>Foncier : "+ foncios +" €</li><li>Bourse : "+ boursos +" €</li></ul></li></ul>");
  });

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

});


//afficheur de modale message;
var affMessage = function(mess){
  $(".overlay").addClass("act");
  $(".container-fluid").addClass("act");
  $(".message").addClass("act").html(String(mess));
};
$(".overlay").on('click', function(){
  $(".act").removeClass("act");
  $(".message").html("");
});

// ###### FX DE CALCUL appelée au drop et remove --> sert de base à l'estimation ######
var calculat = function(){
  //reset de la situation du foyer pour sécuriser le handler du drag and drop
  resultos = 0
  salairos = 0;
  foncios = 0;
  boursos = 0;
  adultos = 0;
  enfantos = 0;
  situatios = "C"; //celibataire par défaut

  // Maj des variables foyer  --> if plutot que else is si on decide de faire porter plusieurs data par elem
  x = $("#contFoyer li");
  for(var i=0; i< x.length; i++) {
    var elem = $(x[i]);
    if (!!elem.data('val')){
      elem.find("input.mont").prop('disabled', true);
      if (elem.hasClass("salaire")){
        salairos += parseInt(elem.data('val'));
      }
      else if (elem.hasClass("foncier")){
        foncios += parseInt(elem.data('val'));
      }
      else if (elem.hasClass("bourse")){
        boursos += parseInt(elem.data('val'));
      }  
    } 
    else if (!!elem.data('adu')){
      adultos += parseInt(elem.data('adu'));
    } 
    else if (!!elem.data('enf')){
      enfantos += parseInt(elem.data('enf'));
    }
    else if (!!elem.data('sit')){
      situatios = elem.data('sit');
    }
    else {
      elem.remove();
      affMessage("<h4 class='bg-info text-center'>Veuillez saisir un montant.</h4>");
    };
  };

  //affichage de plus d'éléments selon le nombre d'adultes -> enfants, pacs etc
  if (adultos >= 1){
    $( "#shopElements li.enfant" ).show(500);
    $( "#shopElements li.revenu" ).show();
  }
  else{ 
    $("#contFoyer li").remove();
    location.reload();
  };
  if (adultos >= 2){
    $( "#shopElements li.situation" ).show(300);
    $( "#shopElements li.adu" ).hide();
  }
  else{
    $( "#shopElements li.situation" ).hide();
    $("#contFoyer li.situation").remove();
    var situatios = "C";
    $( "#shopElements li.adu" ).show();
  };
  if (situatios != "C"){
    $( "#shopElements li.situation" ).hide();
  }

  /*
  1AJ =sal decla = TSHALLOV
  1BJ =sal conj = TSHALLOC
  4BE =rev micro foncier = RFMIC
  3VG = revenu mobilier bours = BPVRCM
  0AO = pacs = V_0AO
  0AM = mariage = V_0AM
  0AC = celib = V_0AC
  0CF = nb enfants = V_0CF
  */
  
  //mettre un appel direct à l'api IR lorsque le header CORS ne sera plus sur same origin
  if (salairos+foncios+boursos > 0){
    var apiReq = 'http://api.ir.openfisca.fr/api/1/calculate?calculee=IRN&saisies={%22V_ANREV%22:' + annee + ',%221AJ%22:' + salairos + ',%224BE%22:' + foncios + ',%223VG%22:' + boursos + ',%220A' + situatios + '%22:1,%220CF%22:' + enfantos + '}';
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: "GET",
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      crossDomain: true,
      url: apiReq
    }).done(function (data) {
      resultos = data;

      $('#resultat').fadeIn( 1000 );
      $("#result").html(resultos + "€");
      $('#result').hide(); //relancer l'effet à chaque recalcul
      $('#result').fadeIn( 1000 );

      if (resultos > 0){
        $('#shEquiv').fadeIn( 300 );
        $('footer').before( "<div class='trigSep'></div><div class='trigView'></div>" );
        // //plugin inview a utiliser pour trigger les fonctions d'affichage des effets
        $('.trigView').one('inview', function (event, visible) {
          if (visible) {
            $('#equivalent').fadeIn( 500 );
            $('#shEquiv, .trigSep, .trigView').remove(); //remove les elements d'acces a equiv
            baro();
            calendar();
            jauge();
          }
        });
      };
    });


  };
};

//suppression d'un element du foyer
var supprElem = function(lol){
  //retablir les situations si on en suppr une
  if($(lol).parents("li").hasClass( "situation" )){
    $( "#shopElements li.situation" ).show(300);
  }else{};
  //suppr de l'element
  $(lol).parents("li").remove();
  //recalcul 
  calculat();
};


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
  
  if (Math.floor(ratioo) > 1){
    var x = 1;
    var descr = vizu.descr.split(' ')[0] + "s";
    while ( x <= (vizu.descr.split(' ').length - 1) ) {
      descr += " " + vizu.descr.split(' ')[x];
      x++;	
    };	
    // temps affich
    if (parseInt(vizu.temps) <= 60){
      $(".radial-progress .circle .mask .fill").css({"background-color": "#97A71D"});
      var percentos = vizu.temps;
    }
    else if (parseInt(vizu.temps) > 120){	
      $(".radial-progress .circle .mask .fill").css({"background-color": "#E03622"});
      var percentos = 60;
    }
    else if (parseInt(vizu.temps) > 60) {
      $(".radial-progress .circle .mask .fill").css({"background-color": "#FE7400"});
      var percentos = 60;
    }	    
    $('#timoDescr').html(Math.round(ratioo) + " " + descr + " (" + vizu.eur + "€)");
	$("#tempos").html(vizu.temps + " min");
  }
  else{
    var percentos = Math.round(resultos / vizu.min);  //nb de minutes avec IR
    $('#timoDescr').html("d'une " + vizu.descr + " (" + vizu.temps + "minutes - " + vizu.eur + "€)");
	$("#tempos").html(percentos + " min");
  }
  var rotRad = 360 * (percentos / 60); //degré rad
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

