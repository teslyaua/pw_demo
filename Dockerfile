# use official container with playwright
FROM mcr.microsoft.com/playwright:v1.26.0-focal

WORKDIR /app

# copy project
COPY . .

# Install dependencies
RUN npm install
# Install browsers
RUN npx playwright install

# Run playwright test
CMD [ "npx", "playwright", "test" ]