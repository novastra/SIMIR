# SIMIR
Appli de simulation d'impôt sur le revenu et de visualisation d'équivalents en termes de services publics.

## Demo
[Sim'IR Beta](http://novastra.net/SIMIR/)

## Fonctionnement
L'application fonctionne en 3 étapes :

1. constitution du foyer par drag and drop;
2. calcul de l'IR en temps réel (via [API IR OpenFisca](https://git.framasoft.org/openfisca/calculette-impots-web-api));
3. et à rapprocher cette somme avec des éléments de comparaison en termes de services publics (Education, médecine, etc.).

## Écrans
![Constitution du foyer](/screenshots/SIMIR_1.png?raw=true)

![Comparaison de l'IR](/screenshots/SIMIR_2.png?raw=true)

## Todo :
- Ajouter des élements pour composer le foyer avec un classement par catégorie (foyer, situation, bnc bic ba)
- Séparer la partie visualisation du fichier js et augmenter le nombre de cas/ dataviz
- Faire un rapprochement avec la logique du projet [CleverTaxes](https://github.com/florent-andre/CleverTaxes) pour la partie comparer l'impot
- Permettre le reverse drag and drop vers elements pour suppr un élément
- Les var de visualisation doivent etre globales et une fonction viz genere aleatoirement un des divs de visualisation en pop d'element des arrays pour ajouter les nouveaux éléments en dessous plutôt qu'en reload random? 
- Utiliser cookie/ contenu local pour garder les infos du foyer.
