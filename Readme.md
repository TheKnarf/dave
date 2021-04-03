# Dave

Dave is a dashboard for Docker, perfect for home servers.

## Docker compose setup

```
  dave:
    image: theknarf/dave
    ports:
      - 80:80
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: unless-stopped
```

Then for each service you want to add to the apps list of `dave` add the following labels:

```
  helloworld:
    image: theknarf/hello-world
    ports:
      - 81:80
    labels:
      - "dave.url=//localhost:81/"
      - "dave.name=Hello World"
    restart: unless-stopped
```

See full `docker-compose` examples in the [examples folder](./examples).
