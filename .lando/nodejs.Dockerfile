FROM node:18

# Do not set NPM_CONFIG_PREFIX, as the path won't be in the PATH varaible.
# Default location is:
# - /usr/local/bin/gulp
# - /usr/local/lib/node_modules/gulp/bin/gulp.j
RUN npm install -g gulp@4

# Set for generic current folder access for gulp if using docker directly (not lando)
WORKDIR /app/frontend-source

# Keep container running, optional for lando but easier for direct docker projects.
ENTRYPOINT ["sleep", "infinity"]
