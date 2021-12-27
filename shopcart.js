function check_company_vat() {

  company_vat = document.getElementById("company_vat").value;
  coupon = document.getElementById('coupon').value;

  $.blockUI({
    message: '<h1><br>請稍等...<br><br></h1>'
  });

  //處理資料
  $.ajax({
    url: "shopcart_post.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "check_company_vat",
      company_vat: company_vat,
      coupon: coupon,
      cart: JSON.stringify(cart_shop)
    },
    success: function(response) {
      $.unblockUI();

      //console.log(response.company_name);

      document.getElementById("company_vat").value = response.company_vat;
      document.getElementById("company_name").innerText = response.company_name;

      coupon_amt = response.coupon_amt;

      $('html').showMessage({
        thisMessage: [response.msg],
        className: 'my_message_style',
        zIndex: 9999,
        opacity: .99,
        autoClose: true,
        delayTime: 1000
      });
      setTimeout(function() {
        cart_shop = response.cart;
        saveCart("更新");
      }, 1000);

    },
    error: function(xhr, status, error) {

      $.unblockUI();

      //console.log("xhr.responseText:"+xhr.responseText);
      return;
    }
  });
}

function create_order() {

  member_id = document.getElementById("member_id").value;

  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  mobile = document.getElementById("mobile").value;
  phone = document.getElementById("phone").value;
  //addr_zip       = document.getElementById("addr_zip").value;
  addr_last = document.getElementById("addr_last").value;
  ord_taxid = document.getElementById("ord_taxid").value;
  ord_letterhead = document.getElementById("ord_letterhead").value;

  company_vat = document.getElementById("company_vat").value;

  //折價券
  coupon = document.getElementById('coupon').value;

  if (cart_shop.length == 0) {
    show_msg("購物車為空,不可成立訂單");
    return;
  }

  if (cart_shop.length != 1) {
    show_msg("一筆訂單只能訂購一門課程");
    return;
  }

  ord_copies = 0;
  if (document.getElementById("ord_copies_2").checked == true) {
    ord_copies = 2;
  }
  if (document.getElementById("ord_copies_3").checked == true) {
    ord_copies = 3;
  }

  //是否同步會員資料
  replace_member_data = "N";
  if (document.getElementById("replace_member_data").checked == true) {
    replace_member_data = "Y";
  }


  if (name == "") {
    show_msg("[姓名]必須輸入");
    return;
  }
  len = getBLen(name); //計算文字長度
  maxlen = 20;
  maxname = "姓名";
  if (len > maxlen) {
    show_msg('[' + maxname + ']不可輸入超過 ' + maxlen + ' 英文字長度');
    return;
  }

  if (email == "") {
    show_msg('[訂購人-聯絡信箱]必須輸入')
    return;
  }
  len = getBLen(email); //計算文字長度
  maxlen = 100;
  maxname = "訂購人-聯絡信箱";
  if (len > maxlen) {
    show_msg('[' + maxname + ']不可輸入超過 ' + maxlen + ' 英文字長度');
    return;
  }
  if (email != "") {
    reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
    if (!reg.test(email)) {
      show_msg('訂購人-聯絡信箱必須為[電子信箱]格式');
      return;
    }
  }

  /*
	var re = /^[0-9]+$/;
    if (!re.test(mobile)) {
		show_msg('[訂購人-手機號碼]只能輸入數字');
        return;
    }

	len = getBLen(mobile);  //計算文字長度
	maxlen  = 20;
	maxname = "訂購人-手機號碼";
	if (len > maxlen) {
		show_msg('['+maxname+']不可輸入超過 '+maxlen+' 英文字長度');
		return;
	}
	*/

  if (phone == "") {
    show_msg('[訂購人-聯絡電話]必須輸入')
    return;
  }

  var re = /^[0-9]+$/;
  if (!re.test(phone)) {
    show_msg('[訂購人-聯絡電話]只能輸入數字');
    return;
  }
  len = getBLen(phone); //計算文字長度
  maxlen = 20;
  maxname = "訂購人-聯絡電話";
  if (len > maxlen) {
    show_msg('[' + maxname + ']不可輸入超過 ' + maxlen + ' 英文字長度');
    return;
  }

  //if (addr_zip == "" || addr_zip == "0") {
  //  show_msg('[訂購人-郵遞區號]必須選擇');
  //  return;
  //}

  //if (addr_last == "") {
  //  show_msg('[訂購人-地址]必須輸入完整');
  //  return;
  //}

  len = getBLen(addr_last); //計算文字長度
  maxlen = 255;
  maxname = "訂購人-地址";
  if (len > maxlen) {
    show_msg('[' + maxname + ']不可輸入超過 ' + maxlen + ' 英文字長度');
    return;
  }

  if (ord_copies == 0) {
    show_msg('[訂購人-訂單發票聯數]必須選擇');
    return;
  }
  if (ord_copies == 3 && ord_taxid == "") {
    show_msg('[訂購人-統一編號]必須輸入');
    return;
  }
  if (ord_copies == 3 && ord_letterhead == "") {
    show_msg('[訂購人-公司抬頭]必須輸入');
    return;
  }

  len = getBLen(mobile); //計算文字長度
  maxlen = 20;
  maxname = "訂購人-發票號碼";
  if (len > maxlen) {
    show_msg('[' + maxname + ']不可輸入超過 ' + maxlen + ' 英文字長度');
    return;
  }

  $.blockUI({
    message: '<h1><br>請稍等...<br><br></h1>'
  });

  //alert(coupon);
  //return;

  //處理資料
  $.ajax({
    url: "shopcart_post.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "create_order",
      replace_member_data: replace_member_data,
      member_id: member_id,
      name: name,
      email: email,
      mobile: mobile,
      phone: phone,
      //addr_zip: addr_zip,
      addr_last: addr_last,
      ord_copies: ord_copies,
      ord_taxid: ord_taxid,
      ord_letterhead: ord_letterhead,
      company_vat: company_vat,
      coupon: coupon,
      coupon_amt: coupon_amt,
      cart: JSON.stringify(cart_shop)
    },
    success: function(response) {
      $.unblockUI();

      //console.log(response.success);
      //console.log(response.msg);

      if (response.success == true) {

        $('html').showMessage({
          thisMessage: [response.msg],
          className: 'my_message_style',
          zIndex: 9999,
          opacity: .99,
          autoClose: true,
          delayTime: 1000
        });
        setTimeout(function() {

          if (localStorage.kkasjdf97ak3) {
            //清空購物車
            localStorage.removeItem("kkasjdf97ak3");
          }
          var cart_shop = [];

          document.location.href = 'viewdata.php';
          return;

        }, 1000);
      } else {

        $('html').showMessage({
          thisMessage: [response.msg],
          className: 'my_message_style',
          zIndex: 9999,
          opacity: .99,
          autoClose: true,
          delayTime: 1000
        });

        return;
      }
    },
    error: function(xhr, status, error) {

      console.log("xhr.responseText:" + xhr.responseText);
      return;
    }
  });

}

var cart_shop = [];
$(function() {
  cart_shop_str = "";
  if (localStorage.kkasjdf97ak3) {
    cart_shop_str = localStorage.kkasjdf97ak3.trim();
  }

  //console.log(cart_shop_str);

  if (cart_shop_str != "") {
    //console.log(cart_str);
    //處理資料
    $.ajax({
      url: "setcrypt.php",
      type: "POST",
      dataType: 'json',
      data: {
        dowhat: "decode",
        data: cart_shop_str
      },
      success: function(response) {

        if (response.success == true) {

          //console.log(response.data);
          cart_shop = JSON.parse(response.data);
          showCart();
          //console.log(cart_shop);
          //console.log(cart_shop.length);
        } else {
          alert("解密失敗");
          return;
        }
      },
      error: function(xhr, status, error) {
        console.log("xhr.responseText:" + xhr.responseText);
        alert("解密失敗");
        return;
      }
    });
  }

  member_id = document.getElementById("member_id").value;

  if (member_id == "") {
    $('html').showMessage({
      thisMessage: ['請先登入會員'],
      className: 'my_message_style',
      zIndex: 9999,
      opacity: .99,
      autoClose: true,
      delayTime: 1000
    });
    setTimeout(function() {
      //
    }, 1000);

    return;
  }

  $.ajax({
    url: "shopcart_member_query.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "query",
      member_id: member_id
    },
    success: function(response) {
      if (response.success == true) {

        document.getElementById("name").value = response.mt_name;
        document.getElementById("email").value = response.mt_email;
        document.getElementById("mobile").value = response.mt_mobile;
        document.getElementById("phone").value = response.mt_phone;
        //document.getElementById("addr_zip").value = response.mt_addr_zip;
        document.getElementById("addr_last").value = response.mt_addr_last;


        //處理郵遞區號欄位
        //$("#addr_zip1").val(response.zip_city).change();

        //處理郵遞區號欄位
        //$("#rec_addr_zip1").val("台北市").change();

        ord_copies_onclick();

      }
    },
    error: function(xhr, status, error) {

      console.log("xhr.responseText:" + xhr.responseText);
      return;
    }
  });
});


function addr_zip1_change() {

  addr_zip1 = document.getElementById("addr_zip1").value;
  addr_zip2 = document.getElementById("addr_zip").value;

  MainObject = document.getElementById("addr_zip2");
  MainUrl = "zipcode_query_select_area.php";

  var i;
  for (i = MainObject.options.length - 1; i >= 0; i--) {
    MainObject.remove(i);
  }

  $.ajax({
    url: MainUrl,
    type: "POST",
    dataType: 'json',
    data: {
      get_city: addr_zip1
    },
    success: function(response) {
      if (response.success == true) {
        document.getElementById("addr_zip2").innerHTML = response.main;
        $("#addr_zip2").val(addr_zip2).change();

        if (document.getElementById("addr_zip2").value == "") {
          $("#addr_zip2").val(0).change();
        }

      }
    },
    error: function(xhr, status, error) {

      console.log("xhr.responseText:" + xhr.responseText);
      return;
    }
  });
}

function addr_zip2_change() {

  document.getElementById("addr_zip").value = document.getElementById("addr_zip2").value;
}


function ord_copies_onclick() {

  ord_copies = 0;
  if (document.getElementById("ord_copies_2").checked == true) {
    ord_copies = 2;
  }
  if (document.getElementById("ord_copies_3").checked == true) {
    ord_copies = 3;
  }

  if (ord_copies == "2") {
    document.getElementById('ord_copies_2').checked = true;
    document.getElementById('ord_copies_3').checked = false;

    document.getElementById("ord_taxid").value = "";
    document.getElementById("ord_letterhead").value = "";

    document.getElementById("ord_taxid").readOnly = true;
    document.getElementById("ord_letterhead").readOnly = true;
  }
  if (ord_copies == "3") {
    document.getElementById('ord_copies_2').checked = false;
    document.getElementById('ord_copies_3').checked = true;

    document.getElementById("ord_taxid").readOnly = false;
    document.getElementById("ord_letterhead").readOnly = false;
  }
}

var coupon_amt = 0;
var coupon_old = "";

$('#coupon').on('beforeItemAdd', function(event) {
  var tag = event.item;

  if (!event.options || !event.options.preventPost) {

    /*抓取檢查折價碼是否存在*/
    $.ajax({
      url: "shopcart_post.php",
      type: "POST",
      dataType: 'json',
      data: {
        dowhat: "check_coupon_code",
        tag: tag,
        cart: cart_shop
      },
      success: function(response) {

        if (response.msg != "") {
          $('html').showMessage({
            thisMessage: [response.msg],
            className: 'my_message_style',
            zIndex: 9999,
            opacity: .99,
            autoClose: true,
            delayTime: 1000
          });
          setTimeout(function() {

            $('#coupon').tagsinput('remove', tag, {
              preventPost: true
            });
          }, 1000);
        }
      },
      error: function(xhr, status, error) {

        console.log("xhr.responseText:" + xhr.responseText);
        return;
      }
    });

  }
});

$('#coupon').on('itemAdded', function(event) {

  company_name = document.getElementById("company_name").innerText;

  coupon = document.getElementById('coupon').value;

  coupon_array = coupon.split(",");

  for (var i in coupon_array) {
    //console.log(coupon_array[i]);
  }

  $.ajax({
    url: "shopcart_post.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "check_coupon_amt",
      coupon: coupon,
      company_name: company_name,
      cart: JSON.stringify(cart_shop)
    },
    success: function(response) {
      coupon_amt = response.coupon_amt;

      //console.log("order amt:"+response.or_amt);
      //console.log("order amt low:"+response.or_amt_low);
      //console.log("coupon amt:"+response.coupon_amt);

      //console.log("mt_association:"+response.mt_association);
      //console.log("company_name:"+response.company_name);

      //更新購物車顯示
      showCart();
    },
    error: function(xhr, status, error) {

      console.log("xhr.responseText:" + xhr.responseText);
      return;
    }
  });
});

function deleteItem(index) {
  cart_shop.splice(index, 1); // delete item at index

  //console.log("刪除:"+index);
  //console.log("car_shop length:"+cart_shop.length);
  for (var i in cart_shop) {
    var item = cart_shop[i];
    //console.log(item.prod_name);
  }

  saveCart("刪除");
  //sortoutCart("刪除");
}

//處理購物車(排序,活動)
function sortoutCart(action) {

  //處理cart
  $.ajax({
    url: "shopcart_post.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "sortout_cart",
      cart: JSON.stringify(cart_shop)
    },
    success: function(response) {
      if (response.success == true) {
        //console.log('msg: ' + response.msg);

        //console.log('cart: ' + JSON.stringify(response.cart) );

        cart_shop = response.cart;
        saveCart(action);
      }
    },
    error: function() {}
  });
}

function saveCart(action) {

  //處理資料
  $.ajax({
    url: "setcrypt.php",
    type: "POST",
    dataType: 'json',
    data: {
      dowhat: "encode",
      data: JSON.stringify(cart_shop)
    },
    success: function(response) {

      if (response.success == true) {

        localStorage.kkasjdf97ak3 = response.data;

        if (cart_shop.length != 0) {

          msg = action + "購物車";

          $('html').showMessage({
            thisMessage: [msg],
            className: 'my_message_style',
            zIndex: 9999,
            opacity: .99,
            autoClose: true,
            delayTime: 1000
          });
          setTimeout(function() {
            //showCart();
          }, 1000);
        } else {
          //showCart();
        }

        showCart();

      } else {
        alert("加密失敗");
        return;
      }
    },
    error: function(xhr, status, error) {
      console.log("xhr.responseText:" + xhr.responseText);
      alert("加密失敗");
      return;
    }
  });

}

function showCart() {

  //console.log("showCart()");
  //console.log(cart_shop);
  //console.log(cart_shop.length);

  if (cart_shop.length == 0) {
    $('html').showMessage({
      thisMessage: ['目前訂購課程為空'],
      className: 'my_message_style',
      zIndex: 9999,
      opacity: .99,
      autoClose: true,
      delayTime: 1000
    });
    setTimeout(function() {
      document.location.href = 'categories.php';
      return;
    }, 1000);

  }

  //$("#cart").css("visibility", "visible");

  $("#cartBody").empty();


  //更新 carBody beign
  var row = "" +
    "<tr>" +
    "    <td align='center' valign='middle' color='black' bgcolor='#cccccc' colspan='8'><font size='5'>預約課程</font></td>" +
    "</tr>";

  $("#cartBody").append(row);

  var row = "" +
    "<tr>" +
    "    <td align='center' width='130px'>序號</td>" +
    "    <td width='200px'></td>" +
    "    <td>課程名稱</td>" +
    "    <td width='130px'>日期</td>" +
    "    <td width='130px' align='right'>金額</td>" +
    "    <td align='center' width='80px'></td>" +
    "</tr>";

  $("#cartBody").append(row);

  j = 0;

  tot_amt = 0;
  all_qty = 0;

  for (var i in cart_shop) {
    var item = cart_shop[i];

    j = j + 1;

    //console.log('calu qty: ' + item.prod_name + "---" + item.prod_gift + "----" + all_qty);

    all_qty = all_qty + parseInt(item.prod_qty);

    amt = parseInt(item.prod_price) * parseInt(item.prod_qty);

    //console.log("prod_price:"+item.prod_price);
    //console.log("prod_qty:"+item.prod_qty);

    tot_amt = tot_amt + amt;

    var row =
      "<tr>" +
      "    <td><br></td>" +
      "</tr>" +
      "<tr>" +
      "    <td style='vertical-align:top' align='center'>" + j + "</td>" +
      "    <td style='vertical-align:top'><img src='" + item.prod_pic + "' width='100px'></td>" +
      "    <td style='vertical-align:top'><a href='course-detail.php?project=" + item.prod_rowid + "' >" + item.prod_name + "</a></td>" +
      "    <td style='vertical-align:top'>" + item.prod_date + " " + item.prod_time + "</td>" +
      "    <td style='vertical-align:top' align='right'>" + new Intl.NumberFormat().format(item.prod_price) + "</td>" +
      "    <td style='vertical-align:top' align='center'><a onclick='deleteItem(" + i + ")'><font size='2'>刪除</font></a></td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='6'><hr></td>" +
      "</tr>";

    $("#cartBody").append(row);
  }

  //console.log("tot_amt:"+tot_amt);

  if (coupon_amt > 0) {

    tot_amt = tot_amt - coupon_amt;

    var row =
      "<tr>" +
      "    <td></td>" +
      "    <td></td>" +
      "    <td></td>" +
      "    <td align='right' style='vertical-align:top;'><b><font color='red'>折價金額</b></font></td>" +
      "    <td align='right' style='vertical-align:top'><b>" + new Intl.NumberFormat().format(coupon_amt) + "</b></td>" +
      "    <td></td>" +
      "</tr>";

    $("#cartBody").append(row);
  }

  var row =
    "<tr>" +
    "    <td></td>" +
    "    <td></td>" +
    "    <td></td>" +
    "    <td align='right' style='vertical-align:top'><b>總金額</b></td>" +
    "    <td align='right' style='vertical-align:top'><b>" + new Intl.NumberFormat().format(tot_amt) + "</b></td>" +
    "    <td></td>" +
    "</tr>";

  $("#cartBody").append(row);

  document.getElementById("cart_qty").innerText = all_qty;
  document.getElementById("cart_qty2").innerText = all_qty;


  //更新 carBody end


  //更新2 carBody beign

  $("#cartBody2").empty();

  var row = "" +
    "<tr>" +
    "    <td class='active' colspan='2' align='center' valign='middle' color='black' bgcolor='#cccccc' ><font size='4'>購物車</font></td>" +
    "</tr>";

  $("#cartBody2").append(row);

  j = 0;

  tot_amt = 0;

  for (var i in cart_shop) {

    var item = cart_shop[i];

    j = j + 1;

    amt = parseInt(item.prod_price) * parseInt(item.prod_qty);

    tot_amt = tot_amt + amt;

    var row = "" +
      "<tr>" +
      "    <td width='50px'>序號</td><td align='center'>" + j + "</td>" +
      "</tr>" +
      "<tr>" +
      "    <td></td><td ><img src='" + item.prod_pic + "' width='90%'></td>" +
      "</tr>" +
      "<tr>" +
      "    <td>名稱</td><td>" + item.prod_name + "</td>" +
      "</tr>" +
      "<tr>" +
      "    <td>日期</td><td>" + item.prod_date + " " + item.prod_time + "</td>" +
      "</tr>" +
      "<tr>" +
      "    <td>金額</td><td>" + new Intl.NumberFormat().format(item.prod_price) + "</td>" +
      "</tr>" +
      "<tr>" +
      "    <td></td><td align='center'><a onclick='deleteItem(" + i + ")'><font size='3'>刪除</font></a></td>" +
      "</tr>" +
      "<tr>" +
      "    <td colspan='2'><hr></td>" +
      "</tr>";

    $("#cartBody2").append(row);
  }

  var row = "" +
    "<tr>" +
    "    <td><b>總金額</b></td>" +
    "    <td><b>" + new Intl.NumberFormat().format(tot_amt) + "</b></td>" +
    "    <td></td>" +
    "</tr>";

  $("#cartBody2").append(row);

  //更新 carBody2 end
}



//取得字串長度
function getBLen(str) {
  if (str == null) return 0;
  if (typeof str != "string") {
    str += "";
  }
  return str.replace(/[^\x00-\xff]/g, "01").length;
}

function show_msg(msg) {

  $('html').showMessage({
    thisMessage: [msg],
    className: 'my_message_style',
    zIndex: 9999,
    opacity: .99,
    autoClose: true,
    delayTime: 1000
  });
  setTimeout(function() {
    //
  }, 1000);
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