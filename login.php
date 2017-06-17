<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/6 0006
 * Time: 下午 1:44
 */
header("Access-Control-Allow-Origin:*");

$name = $_POST["username"];
$pwd = $_POST["password"];

class Res {
    public $status;
    public $msg;
}

$conn = new mysqli("127.0.0.1", "root", "", "mydb") or die("连接失败");
$sql = "select * from user where username='$name' and password='$pwd'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $res = new Res();
    $res->status = 1;
    $res->msg = "登录成功";

    echo json_encode($res);
} else {
    $res = new Res();
    $res->status = 0;
    $res->msg = "用户名或密码输入有误，请检查再登录";

    echo json_encode($res);
}

$conn->close();