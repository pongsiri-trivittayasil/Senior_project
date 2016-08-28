#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <String.h>

//Sting for send microgear
String data = "";

const char* ssid = "jiw";
const char* password = "12345678";

const char* host = "api.github.com";
const int httpsPort = 443;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate
const char* fingerprint = "CF 05 98 89 CA FF 8E D8 5E 5C E0 C2 E4 F7 E6 C3 C7 50 DD 5C";


//convert string to hex for macAddress
String conv_to_hex(String conv_data){
  char conv_data2[2];
  strcpy(conv_data2, conv_data.c_str());
  int conv_data3 = atoi(conv_data2);
  char hex[20];
  sprintf(hex,"%02X",conv_data3);
  return hex;
}
void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.print("connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  //while (WiFi.status() != WL_CONNECTED) {
  //  delay(500);
  //  Serial.print(".");
  //}
  Serial.println("");
  Serial.println("WiFi connected");
}

void loop() {
  Serial.println("scan start");

  // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0)
    Serial.println("no networks found");
  else
  {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i)
    {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.print("macAddress:");
      Serial.print(WiFi.BSSID(i)[0],HEX);
      Serial.print(":");
      Serial.print(WiFi.BSSID(i)[1],HEX);
      Serial.print(":");
      Serial.print(WiFi.BSSID(i)[2],HEX);
      Serial.print(":");
      Serial.print(WiFi.BSSID(i)[3],HEX);
      Serial.print(":");
      Serial.print(WiFi.BSSID(i)[4],HEX);
      Serial.print(":");
      Serial.print(WiFi.BSSID(i)[5],HEX);
      Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE)?" ":"*");

      //data = data+WiFi.SSID(i) + "(";
      String conv;
      for (int j = 0; j < 6; ++j)
      {
        conv = (WiFi.BSSID(i)[j]);
        data = data + conv_to_hex(conv);
      }
      data = data + "," + WiFi.RSSI(i) + ",";
      delay(10);
    }
    Serial.println(data);
  }
  Serial.println("");

  // Wait a bit before scanning again
  delay(5000);
}
