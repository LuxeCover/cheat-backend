# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production Image
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Copy only the production dependencies and the compiled app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./

RUN npm install --omit=dev

# Start the application
CMD ["node", "dist/index.js"]
