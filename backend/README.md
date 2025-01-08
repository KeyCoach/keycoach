# KeyCoach Backend

## Local Development Scripts

```bash
echo "ENV_TYPE=local" > .env
npm install
npm run dev
```

## Production Deployment Scripts

```bash
echo "ENV_TYPE=production" > .env
npm ci
npm run build
npm start
```

## Test Scripts

```bash
npm test
```
