# Stage 1: Build environment
FROM postgres:16 AS builder

# Switch to root to install dependencies
USER root

# Install necessary build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    postgresql-server-dev-16 \
    python3 python3-dev python3-setuptools python3-pip python3.11-venv

# Create a virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Faker and faker_fdw
RUN pip3 install --no-cache-dir Faker
RUN pip3 install https://github.com/guedes/faker_fdw/archive/v0.2.4.zip

# Install multicorn2
RUN wget https://github.com/pgsql-io/multicorn2/archive/refs/tags/v2.5.tar.gz && \
    tar -xvf v2.5.tar.gz && \
    cd multicorn2-2.5 && \
    make && \
    make install

# Stage 2: Runtime environment
FROM postgres:16

# Copy the built artifacts from the builder stage
COPY --from=builder /usr/lib/postgresql/16/lib/multicorn.so /usr/lib/postgresql/16/lib/
COPY --from=builder /usr/lib/postgresql/16/lib/bitcode/multicorn /usr/lib/postgresql/16/lib/bitcode/multicorn
COPY --from=builder /usr/share/postgresql/16/extension/multicorn* /usr/share/postgresql/16/extension/
COPY --from=builder /opt/venv /opt/venv

# Set environment variable for the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Install Python and required libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-dev \
    libpython3.11 \
    && rm -rf /var/lib/apt/lists/*

# Set the library path to include Python libraries
ENV LD_LIBRARY_PATH="/usr/lib/x86_64-linux-gnu:${LD_LIBRARY_PATH}"

# Switch back to postgres user
USER postgres

# Expose the PostgreSQL port
EXPOSE 5432

# Set the default command to run when starting the container
CMD ["postgres"]
