<?php
//連結資料庫
require_once('admin/include/inc_check_frontend.php');


?>

<!DOCTYPE html>
<html>

<head>
    <?php include("include/inc_head.php"); ?>
</head>

<body class="catagories-page">
    <header class="header-content">
        <?php include("include/inc_header.php"); ?>

		<link rel="stylesheet" type="text/css" href="assets/lib/css/bootstrap-tagsinput.css">
		<script src="assets/lib/js/bootstrap-tagsinput.js"></script>

    </header>
    <div class="list-catag">
        <div class="container">

            <div class="shopcart_web">
                <div class="row">
                    <div class="col-md-12">
                        <table style="border-top:3px #FFD382 solid;border-bottom:3px #ccc solid;" cellpadding="10" border='1' width="100%">
                            <tbody id="cartBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="shopcart_mobile">
                <div class="row">
                    <div class="col-md-12 ">
                        <table style="border-top:3px #FFD382 solid;border-bottom:3px #ccc solid;" cellpadding="10" border='1' width="100%">
                            <tbody id="cartBody2">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <br>
			<div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12 center">
                            <div class="form-group">
                                <input type="button" style="font-size:18px" value="繼續訂購課程" onclick="document.location.href='categories.php';" class="btn button-default">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<br>
            <div class="row">
                <div class="col-md-12">
                    <h3 class="heading-text-color">報名人資料<font color="red">(所有欄位皆必填)</font></strong></h3>
					<br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">報名人姓名</label>
                        <div class="col-md-3">
                            <input id="name" type="text" value="" data-msg-required="請輸入姓名" maxlength="100" class="form-control" required>
                        </div>
                        <div class="col-md-3">
                            <label>
                                <input id="replace_member_data" type="checkbox" value="">
                                同步更新會員資料
                            </label>
                        </div>
                    </div>
					<br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">聯絡信箱</label>
                        <div class="col-md-4">
                            <input id="email" type="email" value="" data-msg-required="請輸入聯絡信箱" data-msg-email="請輸入有效的電子信箱" maxlength="100" class="form-control" name="email" id="email" required>
                        </div>
                    </div>
					<br>
                    <div class="form-group" style="display:none">
                        <label class="col-md-2 control-label">手機號碼</label>
                        <div class="col-md-2">
                            <input id="mobile" type="text" value="" data-msg-required="請輸入手機號碼" maxlength="100" class="form-control" required>
                        </div>
                    </div>
					<br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">聯絡電話</label>
                        <div class="col-md-2">
                            <input id="phone" type="text" value="" data-msg-required="請輸入聯絡電話" maxlength="100" class="form-control" required>
                        </div>
                    </div>
					<br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">地址</label>
                        <!-- <div class="col-md-2">
                            <select id="addr_zip1" class="form-control" onchange="addr_zip1_change()">
                                <?php
							         $dbhandle = dbConnect();

							         echo "<option value=\"0\" >目前沒有選擇</option>";
							         $query = " select distinct zip_city ";
							         $query .= "   from zipcode_list ";
							         $query .= "  order by zip_code ";
							         $result = mysqli_query($dbhandle, $query);
							         while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
  							              $zip_city  = trim($row['zip_city']);

   							             echo "<option value=\"$zip_city\" >$zip_city</option> ";
							         }
							         dbDisconnect($dbhandle);
                                     ?>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select id="addr_zip2" onchange="addr_zip2_change()" class="form-control">
                            </select>
                        </div>-->
                        <div class="col-md-4">
                            <input type="text" id="addr_last" value="" placeholder="請輸入您的連絡地址" data-msg-required="請輸入您的連絡地址" maxlength="100" class="form-control">
                        </div>
                        <!--<input type="hidden" id="addr_zip" />-->
                    </div>
					<br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">訂單發票</label>
                        <div class="col-md-10">
                            <div class="radio">
                                <div class="col-md-1">
                                    <input type="radio" value="2" onclick="ord_copies_onclick()" name="ord_copies" id="ord_copies_2" checked="checked">
                                    二聯
                                </div>
                                <div class="col-md-1">
                                    <input type="radio" value="2" onclick="ord_copies_onclick()" name="ord_copies" id="ord_copies_3">
                                    三聯
                                </div>
                                <label class="col-md-2 control-label">統一編號：</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="width:100%" value=""  id="ord_taxid">

                                </div>
                                <label class="col-md-2 control-label">公司抬頭：</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" style="width:100%" value=""  id="ord_letterhead">
                                </div>
                            </div>
                        </div>
                    </div>
					<br><br>
					<div class="form-group">
                        <label class="col-md-2 control-label">企業會員統編</label>
						<div class="col-md-2">
                            <input id="company_vat" type="text" value="<?php echo $_SESSION["tsaa_company_vat"] ?>" maxlength="10" class="form-control" required>
                        </div>
						<div class="col-md-1">
							<input type="button" style="font-size:18px" value="檢查" onclick="check_company_vat()" class="btn">
                        </div>
                        <div class="col-md-3">
							<label id="company_name" style="padding-top:5px;"><?php echo $_SESSION["tsaa_company_name"] ?></label>
                        </div>
                    </div>
					<br><br>
					<div class="form-group">
                        <label class="col-md-2 control-label">折價券</label>
                        <div class="col-md-5">
                            <input id="coupon" type="text" value="" data-role="tagsinput" maxlength="30" class="form-control" required>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12 center">
                            <div class="form-group">
                                <input type="button" style="font-size:18px" value="直接繳費" onclick="create_order()" class="btn">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<br><br>
        </div>
    </div>

    <footer class="footer">
        <?php include("include/inc_footer.php"); ?>
    </footer>

    <script src="assets/lib/js/bootstrap.min.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/lib/slick/slick.min.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/js/wow.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/js/jquery-matchHeight.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/js/slicks.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/js/home.js?ver=<?php echo uniqid() ?>"></script>
    <script src="assets/js/script.js?ver=<?php echo uniqid() ?>"></script>

	<script src="admin/assets/global/plugins/jquery.blockui/jquery.blockUI.js?ver=<?php echo uniqid() ?>"></script>

    <script src="myjs/search.js?ver=<?php echo uniqid() ?>"></script>
    <script src="myjs/all.js?ver=<?php echo uniqid() ?>"></script>

    <script src="myjs/shopcart.js?ver=<?php echo uniqid() ?>"></script>

    <div class="positionfixed"></div>

</body>

</html>
