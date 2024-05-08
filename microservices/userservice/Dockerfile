# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the Maven build to the container
COPY target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose port 8080 for the application
EXPOSE 8084

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
