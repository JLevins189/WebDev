import java.awt.*;
import java.awt.event.*;
import javax.swing.*; 
import java.net.*;
import java.io.*;  
public class Client extends JFrame {
     public Client (){
	     super( "Client" ); 
	     JLabel label = new JLabel("Server Message");
	     Container container = getContentPane();  
	     container.setLayout( new FlowLayout() );
	     container.add(label);
	     setSize( 400, 300 );
	     setVisible( true );	
 	     try {
    	     	DatagramSocket client = new DatagramSocket(4000); // create ServerSocket
		byte messData[] = new byte[100];
		DatagramPacket receivePacket = new DatagramPacket(messData, messData.length);
		client.receive(receivePacket);
		while (true) {
		String message = new String (receivePacket.getData());
		label.setText( "Message from Server: "+ message);
		}   }
		 catch (Exception ex) {
			 System.err.println(ex);
		}   }
     public static void main( String args[] ) {
		 Client application = new Client();
		 application.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE );
		}
	}


