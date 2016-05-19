//Made listening to Dynatron - Intergalactic highway

//######## init de la situation du foyer ########
var annee = new Date().getFullYear();
var salairos = 0;
var bnc = 0;
var bic = 0;
var foncios = 0;
var boursos = 0;
var adultos = 0;
var enfantos = 0;
var situatios = "C"; //celibataire par défaut
resultos = 0;
var credit = 0;
var reduction = 0;

// ######## SETUP de l'app ########
$( document ).ready(function() {

  var $body = $(document);
  $body.bind('scroll', function() {
    // "Disable" the horizontal scroll.
    if ($body.scrollLeft() !== 0) {
          $body.scrollLeft(0);
    }
  });
    
  // fx jquery drag and drop 
  $( ".enfant, #contSitu, #contReve, #contAutr" ).hide();

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
  $(".mont").on("keyup", function () {
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
    affMessage("<h3>Votre foyer</h3><br><ul><li>Nombre d'adultes : "+ adultos +" </li><li>Nombre d'enfants : "+ enfantos +" </li><li>Situation : "+ situatios +" </li><li>Revenus : <ul><li>Salaires : "+ salairos +" €</li><li>BIC : "+ bic +" €</li><li>BNC : "+ bnc +" €</li><li>Foncier : "+ foncios +" €</li><li>Bourse : "+ boursos +" €</li></ul></li><li>Crédit d'impôts : "+ credit +" €</li><li>Réductions d'impôts : "+ reduction +" €</li></ul>");
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
  bnc = 0;
  bic = 0;
  foncios = 0;
  boursos = 0;
  adultos = 0;
  enfantos = 0;
  situatios = "C"; //celibataire par défaut
  credit = 0;  
  reduction = 0;
  
  // Maj des variables foyer  --> if plutot que else is si on decide de faire porter plusieurs data par elem
  x = $("#contFoyer li");
  for(var i=0; i< x.length; i++) {
    var elem = $(x[i]);
    if (!!elem.data('val')){
      elem.find("input.mont").prop('disabled', true);
      if (elem.hasClass("salaire")){
        salairos += parseInt(elem.data('val'));
      }
	  else if (elem.hasClass("bnc")){
        bnc += parseInt(elem.data('val'));
      }	 
	  else if (elem.hasClass("bic")){
        bic += parseInt(elem.data('val'));
      }
	  else if (elem.hasClass("credit")){
        credit += parseInt(elem.data('val'));
      }
	  else if (elem.hasClass("reduction")){
        reduction += parseInt(elem.data('val'));
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
    $( "#contReve, #contAutr" ).show();
  }
  else{ 
    $("#contFoyer li").remove();
    location.reload();
  };
  if (adultos >= 2){
	  
    $( "#contSitu" ).show(300);
    $( "#shopElements li.adu" ).hide(300);
  }
  else{
    $( "#contSitu" ).hide();
    $("#contFoyer li.situation").remove();
    var situatios = "C";
    $( "#shopElements li.adu" ).show(300);
  };
  if (situatios != "C"){
    $( "#contSitu" ).hide();
  }

  //mettre un appel direct à l'api IR lorsque le header CORS ne sera plus sur same origin
  if (salairos+bic+bnc+foncios+boursos > 0){
    //var apiReq = 'http://api.ir.openfisca.fr/api/1/calculate?calculee=IRN&saisies={%22V_ANREV%22:' + annee + ',%221AJ%22:' + salairos + ',%225LO%22:' + bic + ',%225JQ%22:' + bnc + ',%224BE%22:' + foncios + ',%223VG%22:' + boursos + ',%220A' + situatios + '%22:1,%220CF%22:' + enfantos + '}';
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: "GET",
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      crossDomain: true,
      url: apiReq
    }).done(function (data) {
      resultos = data - credit - reduction; //modifier le fonctionnement des crédits et reductions

      $('#resultat').fadeIn( 1000 );
      $("#result").html(resultos + "€");
      $('#result').hide(); //relancer l'effet à chaque recalcul
      $('#result').fadeIn( 1000 );

      if (resultos > 0){
        $('#shEquiv').fadeIn( 300 );
        baro();
        calendar();
        jauge();
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
  }
  else{
    resultos = 0;
    $("#result").html(resultos + "€");
    $("#equivalent").fadeOut( 300 );
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