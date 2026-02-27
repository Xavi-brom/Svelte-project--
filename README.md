# Svelte website deployment (Docker)

Deze projectmap is klaar om de website als container te draaien.

## Vereisten

- Docker Desktop (of Docker Engine + Compose)

## Lokaal draaien met Docker

```bash
docker compose up -d --build
```

Website: `http://localhost:3000`

Logs bekijken:

```bash
docker compose logs -f
```

Stoppen:

```bash
docker compose down
```

## Online deploy (VPS)

1. Installeer Docker + Docker Compose op je server.
2. Kopieer deze projectmap naar de server.
3. Start de container:

```bash
docker compose up -d --build
```

4. Zet een reverse proxy (Nginx/Caddy/Traefik) voor poort `3000` voor je domeinnaam en SSL.

## Bestanden

- `Dockerfile`: bouwt en start de website met `vite preview` op poort `3000`.
- `docker-compose.yml`: standaard service-config voor productieachtig draaien.
- `.dockerignore`: houdt de build-context klein.
