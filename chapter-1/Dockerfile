# Build stage
FROM node:18-alpine

WORKDIR /app
# mkdir /app && cd /app
# RUN mkdir /app && cd /app

# Copy package files
# Dockerの中では、/app/package.jsonというファイルが作成(コピー)される
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build




# Start the application
CMD ["node", "dist/index.js"]
# $ node dist/index.js