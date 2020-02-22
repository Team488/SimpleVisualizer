# Robot Visualizer

[![Build Status](https://travis-ci.org/Team488/SimpleVisualizer.svg?branch=master)](https://travis-ci.org/Team488/SimpleVisualizer)

## Installing the basic services on the drive laptop

Download pre-reqs:
- Download nssm https://nssm.cc/download
- Download influxdb https://dl.influxdata.com/influxdb/releases/influxdb-1.7.10_windows_amd64.zip
- Download grafana https://dl.grafana.com/oss/release/grafana-6.6.2.windows-amd64.zip

Use `nssm` to create services to automatically start with Windows
- influxdb
- java -jar RobotReader-1.0.jar (need fat jar)  