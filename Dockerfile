# Use Maven to build
FROM maven:3.8.6-openjdk-8-slim AS build

# Set the working directory
WORKDIR /backendapp

# Copy pom.xml and source files into workdir
COPY pom.xml .
COPY src ./src

# Build
RUN mvn clean package -DskipTests

# Create image
FROM openjdk:8-jdk-alpine

# Set the workdir for container
WORKDIR /backendapp

# Copy build .jar file to image
COPY --from=build /backendapp/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]