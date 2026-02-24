# LEMI — Maître Ébéniste — Brainstorm Design

<response>
<text>

## Idée 1 — "Galerie Architecturale Silencieuse"

**Mouvement de design :** Architecture Minimale Japonaise (Ma — 間) — l'art du vide intentionnel

**Principes fondamentaux :**
- Le vide est le matériau principal du design, pas les éléments
- Chaque photo est traitée comme une œuvre dans un musée — isolée, respirante
- Le texte est presque absent, réduit à l'essentiel typographique
- La navigation est invisible jusqu'à ce qu'on en ait besoin

**Philosophie couleur :** Ivoire chaud (#F5F3EE) comme un mur de galerie, charcoal profond (#1A1A1A) pour le texte, un seul accent doré très discret (#B89B6A) qui rappelle le laiton des quincailleries haut de gamme. 95% neutre, 5% accent.

**Paradigme de layout :** Full-bleed asymétrique — les images occupent 70-100% de la largeur, alternant entre pleine largeur et compositions décalées gauche/droite. Pas de grille rigide visible. Les sections sont séparées par du vide pur (120-200px).

**Éléments signature :**
- Lignes horizontales ultra-fines (0.5px) comme séparateurs architecturaux
- Texte micro en uppercase tracking large pour les labels (11px, letter-spacing 0.15em)
- Transitions de scroll qui révèlent les images comme si on ouvrait un livre

**Philosophie d'interaction :** Les interactions sont presque imperceptibles — un léger zoom (1.02) au hover, un fade très lent. L'utilisateur doit sentir le calme, pas la technologie.

**Animation :** Fade-in au scroll (0.8s ease), parallax très subtil sur le hero (0.05 ratio). Les images apparaissent une par une avec un délai de 100ms entre chaque.

**Système typographique :** Cormorant Garamond (serif fine, élégante) pour les titres H1/H2 en poids 300-400, DM Sans pour le texte UI en poids 300-400. Maximum 2 tailles de titre.

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## Idée 2 — "Atelier Éditorial"

**Mouvement de design :** Design éditorial de magazine d'architecture (AD, Wallpaper*, Dezeen)

**Principes fondamentaux :**
- Le site se lit comme un magazine haut de gamme qu'on feuillette
- Les photos sont le contenu, le texte est la légende
- Composition magazine : grandes images + micro-captions positionnées avec précision
- Rythme visuel : alternance rapide entre plein cadre et détails

**Philosophie couleur :** Blanc pur (#FAFAF8) comme papier glacé, noir profond (#111111) pour la typographie, gris pierre (#8A8A86) pour les captions. Accent cuivre (#A67C52) uniquement sur les interactions hover.

**Paradigme de layout :** Composition éditoriale — images pleine largeur suivies de paires asymétriques (60/40), puis triptyques. Le scroll vertical mime le feuilletage d'un magazine. Les marges latérales sont généreuses (80px desktop).

**Éléments signature :**
- Numérotation discrète des projets (01, 02, 03...) en petit dans la marge
- Captions qui glissent depuis le bas de l'image au hover
- Séparateurs typographiques (un simple tiret em —) entre les sections

**Philosophie d'interaction :** Chaque image est cliquable pour un mode plein écran. Le cursor change subtilement au survol des images. Navigation par scroll uniquement, pas de menu visible en permanence.

**Animation :** Images qui montent depuis le bas (translateY 40px → 0) avec fade (0.6s). Parallax léger sur les images paysage. Smooth scroll natif.

**Système typographique :** Libre Baskerville (serif classique, lisible) pour les titres, Karla pour le texte UI. Les titres en italic poids 400, le texte UI en regular 300.

</text>
<probability>0.05</probability>
</response>

<response>
<text>

## Idée 3 — "Matière Brute"

**Mouvement de design :** Brutalisme doux — la beauté de la matière sans ornement

**Principes fondamentaux :**
- Le site est aussi brut et honnête que le travail du bois
- Aucune décoration superflue — la photo EST le design
- Les textures et matières parlent d'elles-mêmes
- Le layout est architecturalement rigide mais les images sont vivantes

**Philosophie couleur :** Lin naturel (#F0EDE6) comme fond, presque la couleur du bois clair. Texte en brun-noir (#1E1C1A). Gris chaud (#7A736B) pour le secondaire. Accent noyer (#6B4C30) très rare.

**Paradigme de layout :** Grille modulaire stricte — 3 colonnes sur desktop avec des images qui cassent parfois la grille en occupant 2 colonnes. Le rythme est régulier, presque métronomique, comme le travail précis d'un ébéniste.

**Éléments signature :**
- Bordures très fines autour des images (1px #E2DDD4) comme un cadre de galerie
- Effet de grain subtil sur le fond (CSS noise texture)
- Les sections "forces" sont des blocs monolithiques sans fioritures

**Philosophie d'interaction :** Minimaliste absolu — hover = légère élévation (shadow), click = lightbox plein écran. Pas de transitions fancy.

**Animation :** Entrée simple par opacité (0 → 1, 0.5s). Aucun mouvement latéral. Le site est statique comme un meuble bien posé.

**Système typographique :** EB Garamond pour les titres (poids 400, style normal, pas italic), Work Sans pour le UI (poids 300). Tracking large sur les micro-labels.

</text>
<probability>0.04</probability>
</response>

---

## Choix retenu : Idée 1 — "Galerie Architecturale Silencieuse"

Ce choix correspond parfaitement à la demande du client : très visuel, épuré, minimum de texte, photos qui respirent. Le style galerie japonaise avec beaucoup de vide crée exactement l'atmosphère haut de gamme recherchée.
