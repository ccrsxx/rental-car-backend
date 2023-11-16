---
title: Challenge 1 - Express app with Authentication and PostgreSQL
description: Write an Express app with Authentication and PostgreSQL
nodeProject: true
---

# Simple CRUD application for rental cars

All the documentation for the API can be found on [Swagger](https://dev.risalamin.com/docs).

The API is deployed on [https://dev.risalamin.com](https://dev.risalamin.com), you can hit the endpoints directly from there. It might not be available on the future, so you can also run it locally.

Here's the ERD for the database:

<p align='center'>
  <img src='./.github/assets/erd.png' />
</p>

## List of available users

1. Superadmin

   - email: emilia@rezero.com
   - password: emilia

1. Admin

   - email: rem@rezero.com
   - password: rem

1. Member

   - email: subaru@rezero.com
   - password: subaru

## Development

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/ccrsxx/binar-academy.git
   ```

1. Change directory to the project

   ```bash
   cd binar-academy/public/assignments/chapter_05/challenge_01
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Check your credentials on `.env.development`. Make sure you have the correct credentials for your PostgreSQL database.

1. Create DB if not exists

   ```bash
   npm run db:create
   ```

1. Run migrations

   ```bash
   npm run db:migrate
   ```

1. Run seeders

   ```bash
   npm run db:seed
   ```

1. Run the app

   ```bash
   npm run dev
   ```
