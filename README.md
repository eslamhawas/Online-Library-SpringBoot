# Online Library System - Microservices Architecture

![Microservices](https://img.shields.io/badge/Microservices-Enabled-brightgreen)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-brightgreen)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Java](https://img.shields.io/badge/Java-21-yellow)

## Overview

This project is a revamped version of an online library system, designed and implemented using a microservices architecture. The system leverages **Spring Boot** for service development and **MySQL** as the underlying database for persistence. By decomposing the application into independent services, this approach enhances modularity, scalability, maintainability, and deployment flexibility.

## Features

- **Microservices Architecture**: Decomposed the application into loosely coupled, independently deployable services.
- **RESTful APIs**: Facilitated inter-service communication through RESTful APIs.
- **Spring Boot**: Employed for rapid development, efficient resource management, and streamlined service deployment.
- **MySQL**: Used as the relational database management system for persistence.

## Microservices

The project consists of the following microservices:

1. **User Service**: Manages user registration, authentication, and profile management.
2. **Book Service**: Handles book catalog management, including CRUD operations.
3. **Borrowing Service**: Manages book borrowing transactions and history.

## Prerequisites

- **Java 21**
- **Maven 3.x**
- **MySQL 8.x**
- **Docker**
- **NodeJs**


### 1. Clone the repository

```bash
git clone https://github.com/eslamhawas/online-library-system.git
cd online-library-system
```
### 2. Run the project 

```bash
npm -i
docker-compose up -d
```

## Future Improvements

- Implement service discovery and load balancing using Spring Cloud and Netflix Eureka.
- Integrate API Gateway for centralized API management.
- Add OAuth2 for secure authentication and authorization.
- Implement CI/CD pipeline using Jenkins or GitHub Actions.


