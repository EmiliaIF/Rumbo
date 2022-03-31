# Kom igång

## Skapa databas

- Skapa en databas i din Postgres som heter Rumbo
- Kör schema.sql som ligger i scripts-mappen för att skapa upp tabellerna
- Kör data.sql som ligger i scripts-mappen för att lägga in grunddata

## Konfigurera databas

- Uppdatera filen server/config/local.env med anslutningsuppgifter för din pg-databas

## Installera deps

Kör 'npm  install' i både server och client-mappen

## Starta server (Express / API)

Kör npm start i server-mappen

## Starta client (React-app / frontend)

Kör npm start i client-mappen

## Växla mellan admin / vanlig användare

- Ändra REACT_APP_MOCK_IS_ADMIN till true / false i client/.env
- Ändra MOCK_IS_ADMIN till true / false i server/config/local.env