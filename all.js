var cart_shop = [];
$(function () {
	
	cart_str = "";
	if (localStorage.kkasjdf97ak3) {
	    cart_str = localStorage.kkasjdf97ak3.trim();
	}
	
	if (cart_str != "") {	
	    //處理資料
	    $.ajax({
            url: "setcrypt.php", 
            type: "POST", 
	        dataType: 'json',
            data: { 
		        dowhat:"decode",
		        data:cart_str
		    }, 
            success: function(response) {
						
		        if (response.success == true) {
				
				    cart_shop = JSON.parse(response.data);

					all_qty  = 0;
	
    				for (var i in cart_shop) {		
	    				var item = cart_shop[i];
		
        				all_qty = all_qty + parseInt(item.prod_qty);
    				}
	
					document.getElementById("cart_qty").innerText  = all_qty;
					document.getElementById("cart_qty2").innerText = all_qty;
			    }
			    else {					
				    alert("解密失敗");
				    return;
			    }
            }, 
            error: function(xhr, status, error) {
			    console.log("xhr.responseText:"+xhr.responseText);
			    alert("解密失敗");
			    return;
	        }
        });	
    }
});

function open_login() {
	
	$(window).scrollTop(0);	
	
    $('#modal-signup').modal('hide'); 
	$('#modal-signin').modal('show'); 
	
	$('#modal-signin').css('top', window.top.scrollY); //調整查詢窗出現位置
};

function open_register() {
	
    $(window).scrollTop(0);	
	
    $('#modal-signin').modal('hide'); 
	$('#modal-signup').modal('show');
	
    $('#modal-signin').css('top', window.top.scrollY); //調整查詢窗出現位置
}

function open_forget() { 

    $(window).scrollTop(0);	
	
	$('#modal-reset_pass').modal('show');
	
	$('#modal-reset_pass').css('top', window.top.scrollY); //調整查詢窗出現位置	
};

function close_all_modal() {
	$('#modal-signin').modal('hide'); 
	$('#modal-signup').modal('hide'); 
	$('#modal-reset_pass').modal('hide');
}

//儲存重置的密碼
function Event_Save_Reset_OnClick(email) {
		
	mt_password  = document.getElementById("mt_password").value;
	mt_password2 = document.getElementById("mt_password2").value;	
	
	if (mt_password == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[密碼]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	
	len = getBLen(mt_password);  //計算文字長度
	maxlen  = 100;
	maxname = "密碼";
	if (len > maxlen) {
		event.preventDefault();
		$('html').showMessage({thisMessage: ["["+maxname+"]不可輸入超過 "+maxlen+" 英文字長度"], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	
	if (mt_password != mt_password2) {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[密碼]必須輸入一致'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	
	//處理資料
	$.ajax({
          url: "reset_password_post.php", 
          type: "POST", 
	      dataType: 'json',
          data: { email:email,
		          mt_password:mt_password}, 
          success: function(response) 
		  {
			 //alert(response.query);	
		     if (response.success == true) 
			 {	
                
				event.preventDefault(); 
				$('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999999,opacity: .99,autoClose: true,delayTime: 1000});
		    	setTimeout(function(){					  
			    	window.location = "index.php";			
    	    	},1000);
		     }
			 else 
			 {
				event.preventDefault(); 
				$('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999999,opacity: .99,autoClose: true,delayTime: 1000});
		    	setTimeout(function(){					  
			    	return;	
    	    	},1000);				 
			 }
          }, 
          error: function() 
		  {
	      }
    });
	
};

//送出重置密碼信件
function send_reset_mail() {
	
	
	email = document.getElementById("reset_act").value;
	
	if (email == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[電子信箱]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;			
	}
	if (email != "") {
	    reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
        if (!reg.test(email)) {
			event.preventDefault();
		    $('html').showMessage({thisMessage: ['[訂購人-聯絡信箱必須為[電子信箱]格式'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
            return;
        }
    }
   		
	//處理資料
	$.ajax({
          url: "forgot_post.php", 
          type: "POST", 
	      dataType: 'json',
          data: { email:email
				 }, 
          success: function(response) 
		  {	
		     //console.log("response.success:"+response.success);
			 
		     if (response.success == true) 
			 {		
		         //console.log(response.msg);
				 /*
    			 var box_width  = 300;
				 var box_height = 100;
				 var timer      = 1000;
				 var width      = pageWidth();
    			 var height     = pageHeight();
    			 var left       = leftPosition();
    			 var top        = topPosition();
	
				 var topposition  = top  + (height / 3) - (box_height / 2);
    			 var leftposition = left + (width / 2) - (box_width / 2);
  	
				 var el = document.createElement("div");
    			 el.setAttribute("style","width:"+box_width+"px;height:"+box_height+"px;position:absolute;z-index:99999;top:"+topposition+"px;left:"+leftposition+"px;background-color:grey;");
    			 el.innerHTML = "<br><font size='2' color='white'><center><b>"+response.msg+"</b></center></font>";
    			 setTimeout(function(){
           			  el.parentNode.removeChild(el);
				 
    			 },timer);
				 */
				 
				$('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999,opacity: .99,autoClose: true,delayTime: 1000});
		    	setTimeout(function(){					  
			    	//		
    	    	},1000);
				
				block = document.querySelector('#modal-reset_pass');
    			block .appendChild(el);	
				 
		     }
			 else 
			 {
				 /*
				 var box_width  = 300;
				 var box_height = 150;
				 var timer      = 2000;				 
				 //var box_width  = 600;
				 //var box_height = 600;
				 //var timer      = 12000;
				 var width      = pageWidth();
    			 var height     = pageHeight();
    			 var left       = leftPosition();
    			 var top        = topPosition();
	
				 var topposition  = top  + (height / 3) - (box_height / 2);
    			 var leftposition = left + (width / 2) - (box_width / 2);
  	
				 var el = document.createElement("div");
    			 el.setAttribute("style","width:"+box_width+"px;height:"+box_height+"px;position:absolute;z-index:99999;top:"+topposition+"px;left:"+leftposition+"px;background-color:grey;");
    			 el.innerHTML = "<br><font size='2' color='white'><center><b>"+response.msg+"</b></center></font>";
    			 setTimeout(function(){
           			  el.parentNode.removeChild(el);
				 
    			 },timer);
				 */
				 
				$('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999,opacity: .99,autoClose: true,delayTime: 1000});
		    	setTimeout(function(){					  
			    	//		
    	    	},1000);
				
    			 block = document.querySelector('#modal-reset_pass');
    			 block .appendChild(el);	
				 
				 return;
			 }
          }, 
          error: function() 
		  {
	      }
    });
		
}


function Event_Reg_Check() {	
	
	event.preventDefault();
	
	reg_redirect_url = document.getElementById('reg_redirect_url').value;
	document.getElementById("reg_redirect_url").value = "";
	
    reg_name      = document.getElementById("reg_name").value;
    reg_mobile    = document.getElementById("reg_mobile").value;		
	reg_email     = document.getElementById("reg_email").value;
	reg_password  = document.getElementById("reg_password").value;
	reg_password2 = document.getElementById("reg_password2").value;	
  	
	if (reg_name == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[姓名]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	len = getBLen(reg_name);  //計算文字長度
	maxlen  = 50;
	maxname = "姓名";
	if (len > maxlen) {		
		event.preventDefault();
		$('html').showMessage({thisMessage: ["["+maxname+"]不可輸入超過 "+maxlen+" 英文字長度"], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;		
	}
	
	if (reg_mobile == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[手機號碼]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	len = getBLen(reg_mobile);  //計算文字長度
	maxlen  = 255;
	maxname = "手機號碼";
	if (len > maxlen) {		
		event.preventDefault();
		$('html').showMessage({thisMessage: ["["+maxname+"]不可輸入超過 "+maxlen+" 英文字長度"], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;		
	}
	
	if (reg_email == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[電子信箱]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;		
	}
	len = getBLen(reg_email);  //計算文字長度
	maxlen  = 255;
	maxname = "電子信箱";
	if (len > maxlen) {
		event.preventDefault();
		$('html').showMessage({thisMessage: ["["+maxname+"]不可輸入超過 "+maxlen+" 英文字長度"], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	if (reg_email != "") {
	    reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
        if (!reg.test(reg_email)) {
		    event.preventDefault();
		    $('html').showMessage({thisMessage: ['電子信箱必須為[電子信箱]格式'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
            return;				
        }
    }	
	
	if (reg_password == "") {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[密碼]必須輸入'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
         return;			
	}
	
	len = getBLen(reg_password);  //計算文字長度
	maxlen  = 100;
	maxname = "密碼";
	if (len > maxlen) {
		event.preventDefault();
		$('html').showMessage({thisMessage: ["["+maxname+"]不可輸入超過 "+maxlen+" 英文字長度"], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
        return;
	}
	
	if (reg_password != reg_password2) {
		event.preventDefault();
		$('html').showMessage({thisMessage: ['[密碼]必須輸入一致'], className: 'my_message_style', zIndex: 99999,autoClose: true,delayTime: 1000});
         return;		
	}
		
	//處理資料
	$.ajax({
          url: "register_post.php", 
          type: "POST", 
	      dataType: 'json',
          data: { dowhat: "new",
		          mt_email:reg_email,
		          mt_password:reg_password,
		          mt_name:reg_name,
				  mt_mobile:reg_mobile
				  }, 
          success: function(response) 
		  {		
             console.log(response.msg);
			 
			 console.log("register response.success:"+ response.success);
			 
		     if (response.success == true) 
			 {		
		        
				console.log("register go 1");
				
				event.preventDefault();
			    $('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999999,autoClose: true,delayTime: 1000});
	            setTimeout(function(){
					
					$('#modal-signup').modal('hide'); 
				    $('#modal-signin').modal('hide');
				
					setCookie("tsaa_web_site_usertype", "C", 1);
					
					if (reg_redirect_url == "about_individual.php") {
						document.getElementById("login_redirect_url").value = "about_individual.php";
		    			open_login();
					}
					else {
					    window.location.href = "index.php";	
					}
    		    },1000);			 
		     }
			 else 
			 {	
		        console.log("register go 2");
				 
				event.preventDefault();
				$('html').showMessage({thisMessage: [response.msg], className: 'my_message_style', zIndex: 9999999,autoClose: true,delayTime: 1000});				
				setCookie("tsaa_web_site_usertype", "", 0);
				return;
			 }
          }, 
          error: function() 
		  {
			     console.log("register go 3");
				 
				 event.preventDefault();
				 $('html').showMessage({thisMessage: ['網路有問題'], className: 'my_message_style', zIndex: 9999999,autoClose: true,delayTime: 1000});
				 return;
	      }
    });
	
};
/*
$(function () {
	
	var usertype = getCookie("tsaa_web_site_usertype");
	
	//show_msg(usertype);
	
	//檢查臉書登入狀況
	if (usertype == "F") {
		
        FB.init({
            appId: '895947103893409',
            status: true,
            cookie: true,
            xfbml: true,
            channelUrl: ''
        });
	
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                //FB.logout(function (response) {
                    // user is now logged out
                    //document.getElementById('loginform').submit();
					//show_msg("臉書登入中");
                //});
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook,
                // but has not authenticated your app
                //FB.logout(function (response) {
                    // user is now logged out
                    //show_msg("請重新登入");
				    //document.location.href = 'logout.php';
                //});
            } else {
                // the user isn't logged in to Facebook.
                //show_msg("請重新登入");
				
			    //document.location.href = 'logout.php';
            }
        });
	}
})
*/

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}


function show_msg(msg) {
    /*
    var box_width = 300;
    var box_height = 100;
    var timer = 1000;
    //var box_width  = 600;
    //var box_height = 600;
    //var timer      = 8000;
    var width = pageWidth();
    var height = pageHeight();
    var left = leftPosition();
    var top = topPosition();

    var topposition = top + (height / 3) - (box_height / 2);
    var leftposition = left + (width / 2) - (box_width / 2);

    var el = document.createElement("div");
    el.setAttribute("style", "width:" + box_width + "px;height:" + box_height + "px;position:absolute;z-index:99999;top:" + topposition + "px;left:" + leftposition + "px;background-color:grey;");
    el.innerHTML = "<br><font size='2' color='white'><center><b>" + msg + "</b></center></font>";
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, timer);
    document.body.appendChild(el);
	*/
	
	event.preventDefault();
	$('html').showMessage({thisMessage: [msg], className: 'my_message_style', zIndex: 9999,autoClose: true,delayTime: 1000});
	setTimeout(function(){						  
		//		
    },1000);
}

// calculate the current window width //
function pageWidth() {
    return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}

// calculate the current window height //
function pageHeight() {
    return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
}

// calculate the current window vertical offset //
function topPosition() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

// calculate the position starting at the left of the window //
function leftPosition() {
    return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}


//取得字串長度
function getBLen(str) {  
   if (str == null) return 0;  
   if (typeof str != "string"){  
            str += "";  
   }  
   return str.replace(/[^\x00-\xff]/g,"01").length;  
}  