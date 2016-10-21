<?php
use Ke\Toolkit as fli;
####################################################################
#	File Name	:	ajax_linechartData.php
#	Location	: 	WEBROOT/admin/ajax
####################################################################
//error_reporting(E_ALL);
//ini_set("display_errors","on");

require ("../../configs/db.config.php");
require ("../../configs/general.config.php");
require ("../../configs/url.config.php");
require ("../../classes/log_class.php");
require ("../../classes/main_class.php");

$dbObj = new dbConnect;
$connect = $dbObj->connectDB();
global $pdoConObj;
$logObj = new fli\logClass();
$mainClassObj =	new dbClass();

session_start();
$table = "finance_today";

$result_raw = $mainClassObj->getSchemaInfo($table, "*", "", "", "id", "", "");
// $logObj->printLog(json_encode($result_raw));
echo json_encode($result_raw);