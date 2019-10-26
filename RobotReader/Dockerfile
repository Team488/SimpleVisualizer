# Start with a base image containing Java runtime
FROM gradle:jdk8 as builder

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle installDist 

FROM openjdk:8-jre-slim

COPY --from=builder /home/gradle/src/build/install/* /app/
WORKDIR /app

ENTRYPOINT ["bin/src"]