# Portfolio - Paulina Aleba

Site portfolio personnel, en ligne sur [paulina-aleba.com](https://paulina-aleba.com).

Étudiante Data & IA à Epitech Bordeaux : analyse de données, machine learning,
traitement du langage et restitution visuelle.

## Structure

Le site tient dans une seule page. Les six rubriques sont des sections de
`index.html`, affichées tour à tour en JavaScript : l'URL reste donc toujours
`paulina-aleba.com`, sans chemin ni extension.

```
index.html              Tout le site (6 sections : accueil, à propos,
                        expertises, projets, compétences, contact)
resources/
  *.html                Redirections vers l'accueil (anciennes adresses)
  style.css             Styles généraux
  editorial-bold.css    Styles de la refonte éditoriale
  home-about.css        Styles accueil et à propos
  js/script.js          Navigation, thème clair/sombre, menu, formulaire
  images/               Visuels des projets (WebP)
  assets/               CV au format PDF
```

## Développement

Site statique, sans dépendance ni build. Ouvrir `index.html` dans un navigateur,
ou servir le dossier :

```bash
python3 -m http.server 8000
```

## Déploiement

Hébergé sur GitHub Pages. Chaque push sur `main` met le site en ligne.
