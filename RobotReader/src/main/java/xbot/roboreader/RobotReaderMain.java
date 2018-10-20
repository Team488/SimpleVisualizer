package xbot.roboreader;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.influxdb.dto.Pong;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;
import picocli.CommandLine;
import picocli.CommandLine.Command;
import picocli.CommandLine.Option;

@Command(description = "Reads telemetry from the robot and passes it into a local influxDb table.")
public class RobotReaderMain implements Callable<Void>{

    @Option(names = {"-networkTableServerAddress", "-n"}, description = {"localhost", "10.4.88.2"}, required = false)
    private String networkTableServerAddress = "10.4.88.2";

    @Option(names = {"-influxDbServerAddress", "-i"}, description = {"localhost", "127.0.0.1"}, required = false)
    private String influxDbServerAddress = "localhost";

    @Option(names = {"-refreshRateMs", "-r"}, description = {"50", "100", "1000"}, required = false)
    private int refreshRateMs = 1000;

    @Option(names = {"-debug", "-d"}, description = {"Enable debug logging"}, required = false)
    private boolean debugLogging;


    public static void main(String args[]) throws InterruptedException
    {
        CommandLine.call(new RobotReaderMain(), args);
    }

    public Void call() throws Exception
    {
        String fullInfluxAddress = "http://" + influxDbServerAddress  + ":8086";

        System.out.println("NetworkTable Address: " + networkTableServerAddress);
        System.out.println("InfluxDB Address: " + fullInfluxAddress);

        NetworkTableInstance inst = NetworkTableInstance.getDefault();
        NetworkTable table = inst.getTable("SmartDashboard/PoseSubsystem");
        NetworkTableEntry netX = table.getEntry("Total distance X");
        NetworkTableEntry netY = table.getEntry("Total distance Y");
        NetworkTableEntry netHeading = table.getEntry("CurrentHeading");
        

        
        System.out.println("Starting a network table client...");
        inst.startClient(networkTableServerAddress);
        Thread.sleep(2000);
        System.out.println("Connection status: " +inst.isConnected());

        System.out.println("Starting influxDb client...");
        InfluxDB idb = InfluxDBFactory.connect(fullInfluxAddress, "root", "root");
        Pong p = idb.ping();
        System.out.println("influxDb Ping results: " + p.getResponseTime() + "ms");

        String poseDbName = "RobotPose";
        String poseDbRetentionPolicy = "RobotPoseRetentionPolicy";
        String poseDbMeasurement = "Pose";
        System.out.println("Creating/connecting to influxDb database with name: " + poseDbName);
        System.out.println("Writing measurement with name: " + poseDbMeasurement);

        idb.createDatabase(poseDbName);
        idb.setDatabase(poseDbName);
        idb.createRetentionPolicy(poseDbRetentionPolicy, poseDbName, "30d", "30m", 2, true);

        idb.enableBatch();
        
        for (int i = 0; i < 60; i++) {
            Thread.sleep(1000);

            if (debugLogging) {
                System.out.println(netX.getDouble(0));
                System.out.println(netY.getDouble(0));
                System.out.println(netHeading.getDouble(0));
            }

            idb.write(poseDbName, poseDbRetentionPolicy, Point.measurement(poseDbMeasurement)
            .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
            .addField("X", netX.getDouble(0))
            .addField("Y", netY.getDouble(0))
            .addField("Heading", netHeading.getDouble(0))
            .build());

            idb.flush();
        }

        return null;
    }
}