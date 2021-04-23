# Dave

Dave is a dashboard for Docker, perfect for home servers. It dynamically updates it's list of links to apps based on `labels` set with Docker.

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

## Enviroment variables and labels

You can set the following enviroment variables on the Docker image `theknarf/dave`:

Variable|Default|Description
--------|-------|-----------
bgcolor|#EDEEC0|Background color
textcolor|#433E0E|Text color
accentcolor|#553555|Accent color, used for url's
mdx||The markdown used for the dashboard
forceHttps|false|Redirect to `https`. Possible values `all`, `dave`, `false`.

Labels you can set on containers you want to show on the dashboard:

Label|Default|Description|Note
-----|-------|-----------|----
`dave.name`|Container name|Name to show on the dashboard.|
`dave.url`||Url to link to.|Set either `dave.url` or `dave.relativeSubdomain` but not both.
`dave.relativeSubdomain`||Url to link to, relative to the domain that the dashboard is served from.|Set either `dave.url` or `dave.relativeSubdomain` but not both.
`dave.icon`|Some containers have default icon|The name of an icon, taken from Iconify.|

