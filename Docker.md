 Build and run with docker-compose (recommended):

  docker-compose up -d

  Or build and run with Docker directly:

  docker build -t aqua-docs .
  docker run -d -p 3050:3050 --name aqua-docs aqua-docs

  Useful Commands:

  # View logs
  docker-compose logs -f

  # Stop the container
  docker-compose down

  # Rebuild after changes
  docker-compose up -d --build

  # View running containers
  docker-compose ps

  Your documentation will be accessible at http://localhost:3050 or
  http://your-server-ip:3050. The container will restart automatically if it
   crashes or if the server reboots (unless you explicitly stop it).

  The configuration includes volume mounting, so any changes you make to
  your documentation files will be reflected in real-time without needing to
   rebuild the container.
