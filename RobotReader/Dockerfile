# Start with a base image containing Java runtime
FROM gradle:jdk8 as builder

# Just copy in the gradle files and try to fetch dependencies so they'll be cached
COPY --chown=gradle:gradle build.gradle .
RUN gradle build; exit 0;

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle installDist 

FROM openjdk:8-jre-slim

COPY --from=builder /home/gradle/src/build/install/* /app/
WORKDIR /app

ENTRYPOINT ["bin/src"]