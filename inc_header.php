<?php 

//抓取分類是否啟用
$dbhandle = dbConnect();

$mt_association = 0;
$mt_image = "";
$query = " select mt_image,mt_association from member_list where mt_id = '$tsaa_id'  ";
$result = mysqli_query($dbhandle, $query);
if (mysqli_num_rows($result) != 0) {
    list($mt_image,$mt_association) = mysqli_fetch_row($result);
	
	if ($mt_image != "")
	    $mt_image = $wb_image_path."/member/".$mt_image;
}
				
dbDisconnect($dbhandle);
?>

<div class="header-top hidden-sm hidden-xs" id="header-top" >
    <div class="container">
        <nav class="navbar navbar-inverse header-top__top">

            <div class="navbar-header">
                <a class="navbar-brand logo__link" href="index.php">
				<img class="logo__image" src="<?php echo $wb_header_image ?>" alt="<?php echo $wb_title ?>" style="height:100px;width:auto" style="margin-top:2px"></a>
            </div>

            <form class="navbar-form navbar-left form-search" >
                <div class="form-search__input-group">
                    <input class="form-control form-search__input" type="text" id="mysearch" placeholder="你想學什麼?" value="<?php echo $search ?>" onkeydown="if (event.keyCode == 13) go_search();event.preventDefault();">
                    <div class="form-search__btn-group">
                        <button class="btn form-search__button" type="submit" onclick="go_search();event.preventDefault();"><i class="glyph-icon flaticon-search form-search__icon"></i></button>
                    </div>
                </div>
            </form>
            <div class="bottom-header hidden-sm hidden-xs">
                <div class="container">
                    <div class="logo--menu"><a class="logo__link" href="index.php"><img class="logo__image" src="assets/img/logo/Logo-header.png" alt="Logo Educef"></a></div>
                    <nav class="menu-main">
                        <ul class="nav navbar-nav menu-main__list ">
                            <li class="menu-main__item <?php if ($active=="home")    echo 'active' ?>"><a class="menu-main__link <?php if ($active=="home")    echo 'active' ?>" href="index.php"      >首頁</a></li>
                            <li class="menu-main__item <?php if ($active=="about")   echo 'active' ?>"><a class="menu-main__link <?php if ($active=="about")   echo 'active' ?>" href="about.php"      >關於我們</a></li>
                            <li class="menu-main__item <?php if ($active=="course")  echo 'active' ?>"><a class="menu-main__link <?php if ($active=="course")  echo 'active' ?>" href="categories.php" >課程地圖</a></li>
                            <li class="menu-main__item <?php if ($active=="contact") echo 'active' ?>"><a class="menu-main__link <?php if ($active=="contact") echo 'active' ?>" href="contact.php"    >聯絡我們</a></li>
							<li class="menu-main__item <?php if ($active=="special_column") echo 'active' ?>"><a class="menu-main__link <?php if ($active=="special_column") echo 'active' ?>" href="special_column.php" >TSAA 活動</a></li>
							<li class="menu-main__item <?php if ($active=="experience")     echo 'active' ?>"><a class="menu-main__link <?php if ($active=="experience")     echo 'active' ?>" href="experience.php"     >學員心得</a></li>
                        </ul>
                    </nav>

                    <div class="nav navbar-nav navbar-right nav-right nav-right--login">
                        <div class="nav-right__notifications">
						    <input type="hidden" id="member_id" value="<?php echo $_SESSION["tsaa_id"] ?>">
                            <a class="nav-right__item" href="shopcart.php">
							    <i class="glyph-icon flaticon-commerce-1 nav-right__item__icon"></i>
                                <span class="nav-right__item__notification" id="cart_qty">0</span>
							</a>

						    <?php 
							if ($tsaa_id != "") {
							?>
							<a href="viewdata.php" id="header_user_name"><?php echo $tsaa_name ?></a>｜<a href="logout.php">登出</a>
							
							<?php 
                            } else {
                            ?>								
                            <div class="nav-right__signin"><a class="nav-right__signin__link" href="javascript: void(0);" onclick="open_login();" >登入</a><span>|</span><a class="nav-right__signin__link" href="javascript: void(0);" onclick="open_register();"  >註冊</a></div>
                            <?php 
                            } 
                            ?>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    </div>
</div>


<div class="modal fade signin-form" id="modal-signin" role="dialog" style="z-index:9999">
    <div class="modal-dialog signin-form__dialog">
        <div class="modal-content signin-form__content">
            <div class="modal-body signin-form__body">
                <div class="tab-content" style="margin-top:-10px">
				    <div class="signin-form__button-close ">
                        <button class="close signin-form__button-close__btn" type="button" data-dismiss="modal" style="color:#000">&times;</button>
                    </div>
                    <div id="sign-up" class="tab-pane fade in active" >
					    <a href="index.php" >
						    <img src="<?php echo $wb_header_image ?>" alt="" width="100px" style="margin-top:0px"></a>
						</a>
                        <h3 class="signin-form__body__title"  style="font-size:28px;">登入您的帳號</h3>
                        <form class="signin-form__form" >
                            <div class="signin-form__form__inputs">
                                <input class="input-item" type="text"     id="user_act"  placeholder="電子信箱(登入帳號)" value="">
                                <input class="input-item" type="password" id="user_pass" placeholder="密碼"     value="">
                            </div>
							
                            <input type ="checkbox" id="rem_id" value=""><b> 記住帳號</b><br><br>
                            <script>
							checkCookie();
							</script>
							<input type="hidden" id="login_redirect_url"><!--指定登入後轉向的網址20200813-->
                            <button class="btn-green list-link__btn" onclick="Event_Login_Check();">登入</button>
							<a class="signin-form__link" href="javascript: void(0);" onclick="open_forget();"  style="font-size:12px">忘記您的密碼?</a>
                        </form>
                        <div class="group-btn-socials" style="display:none;margin-top:0;padding-top:0;">
                            <!--<p class="group-btn-socials__sub">或</p>-->
							<a onclick="javascript:oplogin();return false;"  style="margin-top:0;padding-top:0;">
                                <div class="btn-social btn-social--facebook"  style="margin-top:0;"><i class="glyph-icon flaticon-social-1"></i><i>facebook</i></div>
							</a>
							<a id="customBtn"  style="margin-top:0;padding-top:0;">         
                                <div class="btn-social btn-social--google"  style="margin-top:0;"><i class="glyph-icon flaticon-social-2"></i><i>google</i></div>
							</a>
                        </div>
						
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="signin-form__footer"><a class="signin-form__footer__link" href="#" data-toggle="modal" data-target="#modal-reset_pass" data-modal-target="#reset_pass">無法登入?</a></div>-->
    </div>
</div>

<div class="modal fade signin-form" id="modal-signup" role="dialog" style="z-index:9999" >
    <div class="modal-dialog signin-form__dialog">
        <div class="modal-content signin-form__content">
            <div class="modal-body signin-form__body">			    
                <div class="tab-content" >				    
                    <div id="sign-up" class="tab-pane fade in active" >
					    <a href="index.php" >
						    <img src="<?php echo $wb_header_image ?>" alt="" width="100px" style="margin-top:0px"></a>
						</a>
                        <button class="close signin-form__button-close__btn right" type="button" data-dismiss="modal" style="color:#000">&times;</button>                        
                        <h3 class="signin-form__body__title" style="margin-top:-10px">註冊您的帳號</h3>                        
                        <form class="signin-form__form">
                            <div class="signin-form__form__inputs">
							    <input class="input-item" type="email"    id="reg_email"     placeholder="電子信箱(登入帳號)">
                                <input class="input-item" type="text"     id="reg_name"      placeholder="您的姓名">
								<input class="input-item" type="text"     id="reg_mobile"    placeholder="手機號碼">                                
                                <input class="input-item" type="password" id="reg_password"  placeholder="密碼">
                                <input class="input-item" type="password" id="reg_password2" placeholder="再輸入一次密碼">
                            </div>
							<input type="hidden" id="reg_redirect_url"><!--註冊後轉向的網址20200813-->
                            <button class="btn-green list-link__btn" onclick="Event_Reg_Check();">註冊</button>
							<a onclick="javascript:oplogin();return false;" style="display:none;">
                                <div class="btn-social btn-social--facebook" style="margin-top:-10px"><i class="glyph-icon flaticon-social-1"></i><i>facebook</i></div>
							</a>
                            <a id="customBtn2" >         
                                <div class="btn-social btn-social--google" style="display:none;margin-top:5px"><i class="glyph-icon flaticon-social-2"></i><i>google</i></div>
							</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="signin-form__footer"><a class="signin-form__footer__link" href="#" data-toggle="modal" data-target="#modal-reset_pass" data-modal-target="#reset_pass">無法登入?</a></div>-->
    </div>
</div>

<div class="modal fade signin-form" id="modal-reset_pass" role="dialog" style="z-index:9999" >
    <div class="modal-dialog signin-form__dialog">
        <div class="modal-content signin-form__content">		    
            <div class="modal-body signin-form__body">
                <div class="tab-content" style="margin-top:-10px">
				    <div class="signin-form__button-close">
                         <button class="close signin-form__button-close__btn" type="button" data-dismiss="modal" style="color:#000">&times;</button>
                    </div>
                    <div id="reset_pass" class="tab-pane fade in active" >
					    <a href="index.php" >
						    <img src="<?php echo $wb_header_image ?>" alt="" width="100px" style="margin-top:0px"></a>
						</a>
                        <h3 class="signin-form__body__title" >重新設定密碼</h3>
                        <p class="signin-form__body__sub"></p>
                        <form class="signin-form__form">
                            <div class="signin-form__form__inputs">
                                <input class="input-item" type="text" id="reset_act"  placeholder="電子信箱" value="">
                            </div>							
                            <button class="btn-green list-link__btn" onclick="send_reset_mail();" style="width:100%;padding-left:0px;padding-right:0px;margin:auto">送出重置密碼</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="header__mobile hidden-lg hidden-md" >
    <div class="header-top" >
        <div class="container">
            <div class="nav-right--notlogin nav-right--notlogin--mobile pull-right">
                <div class="nav-right__notifications">
                    <a class="nav-right__item" href="shopcart.php"><i class="glyph-icon flaticon-commerce-1 nav-right__item__icon"></i><span class="nav-right__item__notification" id="cart_qty2">0</span></a>
                    <button class="form-search__button--mobile" type="submit" data-toggle="collapse" data-target="#form-search-mobile"><i class="glyph-icon flaticon-search form-search__icon"></i></button>
                    
					<?php 
                    if ($tsaa_name != "") {
                    ?>
					<a class="nav-right__signin__link" href="viewdata.php" ><?php echo $tsaa_name ?></a><span>|</span><a class="nav-right__signin__link" href="logout.php" >登出</a>
                    <?php 
                    } 
                    ?>
					<?php 
                    if ($tsaa_name == "") {
                    ?>								
                    <div class="nav-right__signin"><a class="nav-right__signin__link" href="javascript: void(0);" data-toggle="modal" data-target="#modal-signin" data-modal-target="#sign-in" >登入</a><span>|</span><a class="nav-right__signin__link" href="javascript: void(0);" data-toggle="modal" data-target="#modal-signup" data-modal-target="#sign-up" >註冊</a></div>
                    <?php 
                    } 
                    ?>
                </div>
            </div>
            <form class="navbar-form form-search--mobile" id="form-search-mobile" style="border:0px;z-index:9999999;margin-top:-10px;">
                <div class="container">				    
                    <div class="form-search__input-group">
                        <input class="form-control form-search__input" type="text" placeholder="你想學什麼?" id="mysearch2" value="<?php echo $search ?>" onkeydown="if (event.keyCode == 13) go_search2();event.preventDefault();">
                        <div class="form-search__btn-group">
                            <button class="btn form-search__button" type="submit" onclick="go_search2();event.preventDefault();"><i class="glyph-icon flaticon-search form-search__icon"></i></button>
                        </div>
                    </div>
							
                    <button class="dropdown-toggle form-search__button form-search__button--close" type="submit" data-toggle="collapse" data-target="#form-search-mobile"><i class="glyph-icon flaticon-access-denied form-search__icon"></i></button>
                </div>
            </form>
        </div>
    </div>
    <nav class="navbar" id="header-mobile" data-spy="affix" data-offset-top="75" style="z-index:999">
        <div class="container">
            <button class="navbar-toggle nav-icon pull-right collapsed visible-sm visible-xs" id="menu-hamberger" data-toggle="collapse" data-target="#menu-main"><span class="bar"></span></button>
            <div class="logo--mobile text-center"><a class="logo__link" href="index.php">
			    <img class="logo__image" src="<?php echo $wb_header_image ?>" alt="" width="100%" style="margin-top:5px"></a>
			</div>
        </div>
        <div class="menu-mobile">
            <ul class="menu-mobile__list ">
                <li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="index.php">首頁</a>
                </li>
                <li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="about.php" >關於我們</a>
                </li>
                <li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="categories.php">課程地圖</a>
                </li>
                <li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="contact.php">聯絡我們</a>
                </li>
				<li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="special_column.php">講師專欄</a>
                </li>
				<li class="menu-mobile__item"><a class="menu-mobile__link" style="color:#fff" href="experience.php">學員心得</a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<div class="button-default btn-ontop" id="on-top"><span class="glyph-icon flaticon-arrows-5"></span></div>