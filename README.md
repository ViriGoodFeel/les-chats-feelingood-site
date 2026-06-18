# Les Chats Feelingood - système d'administration

Application Next.js en français pour gérer les chats à l'adoption avec une interface privée très simple.

## Fonctions incluses

- Tableau de bord privé protégé par connexion Supabase.
- Bouton **Ajouter un chat**.
- Téléversement de plusieurs photos depuis un téléphone ou un ordinateur.
- Champs complets : nom, âge, sexe, stérilisation, vaccination, santé, personnalité, histoire du sauvetage, frais d'adoption, besoins particuliers.
- Publication en un clic avec création automatique de la page publique `/adoption/nom-du-chat`.
- Modification, suppression et marquage immédiat comme adopté.
- Pages publiques en français uniquement.

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Configuration Supabase

1. Créer un projet Supabase.
2. Copier `Project URL` dans `NEXT_PUBLIC_SUPABASE_URL`.
3. Copier la clé secrète `service_role` dans `SUPABASE_SERVICE_ROLE_KEY` uniquement côté serveur.
4. Choisir `ADMIN_PASSWORD` et `ADMIN_SESSION_SECRET` dans `.env.local`.
5. Ouvrir l'éditeur SQL Supabase et exécuter `supabase/schema.sql`.
6. Se connecter sur `/connexion`, puis gérer les chats dans `/admin`.

## Variables d'environnement

Voir `.env.example`.
