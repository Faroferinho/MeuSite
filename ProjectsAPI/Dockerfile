FROM ubuntu:latest
LABEL authors="User"

ENTRYPOINT ["top", "-b"]

FROM azul-zulu:25.0.4-jdk AS builder
WORKDIR /app
COPY . .

FROM azul-zulu:25.0.4-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]