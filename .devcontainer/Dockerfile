ARG VARIANT=22-bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

# Install tslint, typescript. eslint is installed by javascript image
# ARG NODE_MODULES="tslint-to-eslint-config typescript"
# RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
#     && npm cache clean --force > /dev/null 2>&1

# Install necessary tools
RUN apt-get update && apt-get install -y curl gnupg lsb-release

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh

# Download and install Supabase CLI
RUN curl -L -o supabase.deb "https://github.com/supabase/cli/releases/download/v1.191.3/supabase_1.191.3_linux_amd64.deb" \
    && dpkg -i supabase.deb \
    && rm supabase.deb

    # Install deno
# ENV DENO_INSTALL=/deno
# RUN mkdir -p /deno \
#     && curl -fsSL https://gist.githubusercontent.com/LukeChannings/09d53f5c364391042186518c8598b85e/raw/ac8cd8c675b985edd4b3e16df63ffef14d1f0e24/deno_install.sh | sh \
#     && chown -R vscode /deno

# ENV PATH=${DENO_INSTALL}/bin:${PATH} \
#     DENO_DIR=${DENO_INSTALL}/.cache/deno

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*