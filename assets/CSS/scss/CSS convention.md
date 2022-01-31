#Organisation conventionnelle du CSS ##Sections Organisation basé sur ITCSS avec l'ajout des sections "vendor", "pages" et "themes".

SETTINGS : fonts, variables (couleurs, breakpoints, grid)
TOOLS : functions, keyframes, placeholders, mixins
GENERIC : reset, normalize, box-sizing
VENDOR : librairies tierces
ELEMENTS : HTML Elements > img, header, typography
OBJECTS : wrappers, containers, ...
COMPONENTS : btn, card, alert, ...
PAGES : styles spécifiques à certaines pages > home, contact
UTILITIES : helpers, modifiers, venant surcharger les styles définis
THEMES : styles surchargeant le thème par défaut > dark, light, winter
##Convention sur le nommage des classes : BEM "BEM > Block Element Modifier"

.block__element--modifier
##BEM et ITCSS : BEMIT Ajouter un préfixe à la classe correspondant à l'initial de la catégorie ITCSS :

.prefix-block__element--modifier
Exemple :

.o-block__element--modifier //pour les objets
.c-block__element--modifier //pour les composants
.u-block__element--modifier //pour les utilitaires