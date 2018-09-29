package xbot.roboreader;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;

public class RobotReaderMain {

    public static void main(String args[]) throws InterruptedException
    {
        System.out.println("quick gradle test");

        NetworkTableInstance inst = NetworkTableInstance.getDefault();

        NetworkTable table = inst.getTable("Testing");
        NetworkTableEntry entry = table.getEntry("testo");
        NetworkTableEntry entry2 = table.getEntry("secondTesto");

        inst.startClient("localhost");

        while(true) {
            Thread.sleep(1000);

            entry2.setBoolean(true);

            System.out.println(entry.getString("no value yet"));
        }

    }
}