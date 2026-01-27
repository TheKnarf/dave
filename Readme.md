# Dave

Dave is a dashboard for Docker and Kubernetes, perfect for home servers. It dynamically updates its list of links to apps based on `labels` set with Docker or `annotations` on Kubernetes Services.

## Docker compose setup

```yaml
dave:
  image: theknarf/dave
  ports:
    - 80:80
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  restart: unless-stopped
```

Then for each service you want to add to the apps list of `dave` add the following labels:

```yaml
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

## Kubernetes setup

Dave can also run in Kubernetes and discover services via annotations.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dave
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dave
  template:
    metadata:
      labels:
        app: dave
    spec:
      serviceAccountName: dave
      containers:
      - name: dave
        image: theknarf/dave
        ports:
        - containerPort: 80
        env:
        - name: DAVE_PROVIDER
          value: "kubernetes"
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: dave
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: dave-service-reader
rules:
- apiGroups: [""]
  resources: ["services"]
  verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: dave-service-reader
subjects:
- kind: ServiceAccount
  name: dave
  namespace: default
roleRef:
  kind: ClusterRole
  name: dave-service-reader
  apiGroup: rbac.authorization.k8s.io
```

Then for each service you want to show on the dashboard, add annotations:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
  annotations:
    dave.name: "My Application"
    dave.url: "http://my-app.example.com"
    dave.icon: "mdi:application"
spec:
  selector:
    app: my-app
  ports:
  - port: 80
```

## Environment variables

Variable|Default|Description
--------|-------|-----------
DAVE_PROVIDER|auto|Provider to use: `docker`, `kubernetes`, or `auto` (auto-detects)
bgcolor|#EDEEC0|Background color
textcolor|#433E0E|Text color
accentcolor|#553555|Accent color, used for urls
mdx||The markdown used for the dashboard
forceHttps|false|Redirect to `https`. Possible values `all`, `dave`, `false`.

## Labels / Annotations

For Docker containers, use labels. For Kubernetes services, use annotations. The format is the same:

Name|Default|Description|Note
----|-------|-----------|----
`dave.name`|Container/Service name|Name to show on the dashboard.|
`dave.url`||URL to link to.|Set either `dave.url` or `dave.relativeSubdomain` but not both.
`dave.relativeSubdomain`||URL to link to, relative to the domain that the dashboard is served from.|Set either `dave.url` or `dave.relativeSubdomain` but not both.
`dave.icon`||The name of an icon, taken from [Iconify](https://iconify.design/).|Some containers have default icons

## Provider auto-detection

When `DAVE_PROVIDER` is set to `auto` (the default), Dave will:

1. Check if running inside Kubernetes (via `KUBERNETES_SERVICE_HOST` env var)
2. Fall back to Docker if `/var/run/docker.sock` exists
3. Default to Docker for backwards compatibility
