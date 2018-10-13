package xbot.roboreader;

import java.util.concurrent.TimeUnit;

import org.influxdb.BatchOptions;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.influxdb.dto.Pong;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;

public class RobotReaderMain {

    public static void main(String args[]) throws InterruptedException
    {
        System.out.println("quick gradle test");

        NetworkTableInstance inst = NetworkTableInstance.getDefault();

        NetworkTable table = inst.getTable("SmartDashboard/PoseSubsystem");
        NetworkTableEntry netX = table.getEntry("Total distance X");
        NetworkTableEntry netY = table.getEntry("Total distance Y");
        NetworkTableEntry netHeading = table.getEntry("CurrentHeading");
        

        String networkTableIpAddress = "10.4.88.2";
        System.out.println("Beginning connection phase");
        inst.startClient(networkTableIpAddress);

        InfluxDB idb = InfluxDBFactory.connect("http://localhost:8086", "root", "root");
        Pong p = idb.ping();

        String poseDbName = "RobotPose";
        String poseDbRetentionPolicy = "RobotPoseRetentionPolicy";

        idb.createDatabase(poseDbName);
        idb.setDatabase(poseDbName);
        idb.createRetentionPolicy(poseDbRetentionPolicy, poseDbName, "30d", "30m", 2, true);

        idb.enableBatch();
        
        for (int i = 0; i < 60; i++) {
            Thread.sleep(1000);

            System.out.println(netX.getDouble(0));
            System.out.println(netY.getDouble(0));
            System.out.println(netHeading.getDouble(0));

            idb.write(poseDbName, poseDbRetentionPolicy, Point.measurement("Pose")
            .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
            .addField("X", netX.getDouble(0))
            .addField("Y", netY.getDouble(0))
            .addField("Heading", netHeading.getDouble(0))
            .build());

            idb.flush();
        }

        Query query = new Query("SELECT * FROM \"Pose\"", poseDbName);
        QueryResult qr = idb.query(query);
        System.out.println(qr.getResults().toString());
/*
        InfluxDB idb = InfluxDBFactory.connect("http://localhost:8086", "root", "root");
        Pong p = idb.ping();

        String poseDbName = "RobotPose";
        String poseDbRetentionPolicy = "RobotPoseRetentionPolicy";

        idb.createDatabase(poseDbName);
        idb.setDatabase(poseDbName);
        idb.createRetentionPolicy(poseDbRetentionPolicy, poseDbName, "30d", "30m", 2, true);

        System.out.println(idb.databaseExists(poseDbName));
        
        idb.enableBatch();
        idb.write(poseDbName, poseDbRetentionPolicy, Point.measurement("Pose")
            .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
            .addField("X", 13.0)
            .addField("Y", 10.0)
            .addField("Heading", 177.0)
            .build());

        idb.flush();

        Query query = new Query("SHOW MEASUREMENTS", poseDbName);
        QueryResult qr = idb.query(query);
        System.out.println(qr.getResults().toString());
        
        query = new Query("SELECT * FROM \"Pose\"", poseDbName);
        qr = idb.query(query);
        System.out.println(qr.getResults().toString());

        System.out.println(p.getResponseTime());

        */
    }
}