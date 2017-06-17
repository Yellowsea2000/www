<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/6 0006
 * Time: 下午 12:01
 */
header("Access-Control-Allow-Origin:*");

$name = $_POST["username"];
$pwd = $_POST["password"];


//echo $name;
//echo $pwd;


class Res {
    public $status;
    public $msg;
}

$conn = new mysqli("127.0.0.1", "root", "", "mydb") or die("连接失败");
$sql = "select * from user where username='$name'";
//
//echo $sql;
$result = $conn->query($sql);

$isExist = false;
if ($result->num_rows > 0) {
    $res = new Res();
    $res->status = 0;
    $res->msg = "该用户已存在";
    echo json_encode($res);
} else {
    $conn->close();

    $conn2 = new mysqli("127.0.0.1", "root", "", "mydb") or die("连接失败");
    $sql1 = "insert into user(username,password) values('$name','$pwd')";

    if ($conn2->query($sql1)) {
        $res = new Res();
        $res->status = 1;
        $res->msg = "注册成功";

        echo json_encode($res);
    } else {
        $res = new Res();
        $res->status = 2;
        $res->msg = "注册失败";

        echo json_encode($res);

    }

    $conn2->close();


}