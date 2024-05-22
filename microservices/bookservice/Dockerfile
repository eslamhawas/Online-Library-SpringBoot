
FROM eclipse-temurin:17-jre-alpine



WORKDIR /app


COPY target/OnlineLibrary-SW2-0.0.1-SNAPSHOT.jar /app/app.jar


EXPOSE 8082


CMD ["java", "-jar", "app.jar"]