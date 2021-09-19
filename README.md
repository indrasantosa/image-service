# About this repo
This repo is a service to help file conversion. It uses typescript and libvips in order to do image processing.

## Installation
```bash
# Developed using node 14.17.3
npm install

# Copy and update .env file
cp sample.env .env

# Run the dev server
npm run dev
```

## Docker
Developing via docker also available
```bash
# This command will spin mysql as the dependency
docker-compose up -d
```

## Testing
```bash
# Run unit testing
npm run test

# Run e2e testing, make sure server is running at port 3000
npm run e2e
```