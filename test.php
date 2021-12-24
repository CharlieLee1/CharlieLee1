<?php
$servername = "localhost";
$username = "root";
$password = "zxcv0716";
$dbname = "test_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306, "/var/run/mysqld/mysqld.sock");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, name FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "id: " . $row["id"]. " - Name: " . $row["name"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>
