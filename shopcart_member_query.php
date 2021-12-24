<?php
//session_start();

require_once('admin/include/inc_database.php');
require_once('admin/include/inc_func.php');

if (isset($_POST['dowhat'])) {

    $dowhat = myStripslashes($_POST['dowhat']);

    try {

		$myDate =  date("Ymd");
        $myTime =  date("H:i:s");

        $dbhandle = dbConnect();

        $json = array();

        $mt_id       = "";

        if (isset($_POST["member_id"]))
            $mt_id = trim(myStripslashes($_POST['member_id']));



	        $query9  = " select mt_id,mt_account,mt_name,mt_gender,mt_type,mt_email,mt_mobile,mt_phone,mt_enabled,";
			//$query9 .= "        mt_association,mt_addr_zip,mt_addr_last,zip_code,zip_city,zip_area,  ";
			$query9 .= "        mt_vat,mt_fb_nickname,mt_google_nickname,mt_create_date,mt_create_time ";
			$query9 .= "   from member_list ";
			//$query9 .= "   left outer join zipcode_list on zip_rowid = mt_addr_zip ";
			$query9 .= "  where mt_id = '%s' ";
            $query  = sprintf($query9,
				              mysqli_real_escape_string($dbhandle, $mt_id)
							  );
            $result = mysqli_query($dbhandle, $query);

            list($mt_id,$mt_account,$mt_name,$mt_gender,$mt_type,$mt_email,$mt_mobile,$mt_phone,$mt_enabled,
			     $mt_association,
					 //$mt_addr_zip,
					 $mt_addr_last,
					 //$zip_code,$zip_city,$zip_area,
				 $mt_vat,$mt_fb_nickname,$mt_google_nickname,$mt_create_date,$mt_create_time
				 ) = mysqli_fetch_row($result);

			$mt_create_date = substr($mt_create_date,0,4)."/".substr($mt_create_date,4,2)."/".substr($mt_create_date,6,2);

			$association_type = $mt_association;
    		if ($mt_association == 0) $association_type = "網路會員";
			if ($mt_association == 1) $association_type = "協會個人會員";
			if ($mt_association == 2) $association_type = "協會企業會員";

            $json["success"]       = true;

            $json["mt_rowid"]     = $mt_rowid;
			$json["mt_id"]        = $mt_id;
			$json["mt_account"]   = $mt_account;
			$json["mt_name"]      = $mt_name;
			$json["mt_gender"]    = $mt_gender;
			$json["mt_type"]      = $mt_type;
			$json["mt_email"]     = $mt_email;
			$json["mt_mobile"]    = $mt_mobile;
			$json["mt_phone"]     = $mt_phone;
			$json["mt_enabled"]   = $mt_enabled;

			$json["mt_association"]  = $association_type;

			//$json["mt_addr_zip"]  = $mt_addr_zip;
			$json["mt_addr_last"] = $mt_addr_last;
			//$json["zip_code"]     = $zip_code;
			//$json["zip_city"]     = $zip_city;
			//$json["zip_area"]     = $zip_area;
			$json["mt_vat"]       = $mt_vat;

			$json["mt_fb_nickname"]     = $mt_fb_nickname;
			$json["mt_google_nickname"] = $mt_google_nickname;
			$json["mt_create_date"]     = $mt_create_date." ".$mt_create_time;

			dbDisconnect($dbhandle);
			echo json_encode($json,JSON_UNESCAPED_UNICODE);
			exit;

    }
    catch (PDOException $e) {

        dbDisconnect($dbhandle);

        $json["success"] = false;
        $json["msg"]     = $e->getMessage();

		dbDisconnect($dbhandle);
        echo json_encode($json,JSON_UNESCAPED_UNICODE);
		exit;
    }

}

?>
