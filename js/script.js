
$(function() {
				$('a[href*="#"]:not([href="#"])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
				$('html, body').animate({
				scrollTop: target.offset().top
				}, 500);//움직이는 시간 조정
				return false;
				}
      }
    });
  });

// hover 애니메이션

// 섹션3
$(function(){

  $(".section3_list li").mouseover(function(){
    $(this).find('.section3_list_item_back')
        .removeClass('opacity_0')
        .addClass('opacity_1');
  });
  $(".section3_list li").mouseleave(function(){
    $(this).find('.section3_list_item_back')
        .removeClass('opacity_1')
        .addClass('opacity_0');
  });

})

// 섹션6
$(function(){

  $(".section6_tips_list li").mouseover(function(){
    $(this).find('.section6_tips_list_back')
        .removeClass('opacity_0')
        .addClass('opacity_1');
  });
  $(".section6_tips_list li").mouseleave(function(){
    $(this).find('.section6_tips_list_back')
        .removeClass('opacity_1')
        .addClass('opacity_0');
  });

})

// 섹션9
$(function(){

  $(".gift_list li").mouseover(function(){
    $(this).find('.gift_list_back')
        .removeClass('opacity_0')
        .addClass('opacity_1');
  });
  $(".gift_list li").mouseleave(function(){
    $(this).find('.gift_list_back')
        .removeClass('opacity_1')
        .addClass('opacity_0');
  });

})

$(function(){

  $(".gift_biglist_position").mouseover(function(){
    $(this).find('.gift_biglist_back')
        .removeClass('opacity_0')
        .addClass('opacity_1');
  });
  $(".gift_biglist_position").mouseleave(function(){
    $(this).find('.gift_biglist_back')
        .removeClass('opacity_1')
        .addClass('opacity_0');
  });

})



// top버튼
$(function(){

  $(".top_btn_wrap").hide();

  $(window).scroll(function(){
    var scrollHeight = $(document).scrollTop();
    if( 800 <= scrollHeight){
      $(".top_btn_wrap").fadeIn();
    }else{
      $(".top_btn_wrap").fadeOut();
    }
  });

});


//헤더

$(function(){


  let lnbId = null;
  let gnbId = null;
  $(".submenu_container").hide();
  $(".gnb>li>a").addClass("gnbborder");

  $(".gnb>li>a").mouseover(function(){
    gnbId = $(this).attr("id");
    $(".submenu_container").stop().slideDown(300);
  });

  $(".submenu_container .lnb_container>li").mouseover(function(){

    lnbId = $(this).attr("id");

    switch(lnbId){
      case "lnb1":
        $(".gnb>li>a").removeClass("gnbhover");
        $("#gnb1").addClass("gnbhover");
        break;
      case "lnb2":
        $(".gnb>li>a").removeClass("gnbhover");
        $("#gnb2").addClass("gnbhover");
        break;
      case "lnb3":
        $(".gnb>li>a").removeClass("gnbhover");
        $("#gnb3").addClass("gnbhover");
        break;
      case "lnb4":
        $(".gnb>li>a").removeClass("gnbhover");
        $("#gnb4").addClass("gnbhover");
        break;
    }
    

  });

  
  $(".lnb_container").mouseleave(function(){
    $(".submenu_container").stop().slideUp(300);
    $(".gnb>li>a").removeClass("gnbhover");
  });

  $(document).on("mouseleave", function () {
    $(".submenu_container").stop().slideUp(300);
    $(".gnb>li>a").removeClass("gnbhover");
  });

  
});



// 섹션2_단체소개
$(function(){

    $("#section2_snb>li").click(function(){

        $("#section2_snb>li>a").removeClass();
        let click = $(this).attr("id");
        let clickId = $("#"+click+" > a");
        $(clickId).addClass("snb_on");
 

        let divele = $("#section2_contents_wrap > *:nth-child("+($("#"+click).index()+1)+")");
        let divId = divele.attr("id");

        $("#section2_contents_wrap> div").hide();
        $("#"+divId).show();

    });
    

});



// 섹션4_edu

$(function(){

  $(".edu_list_info_event").mouseover(function(){
    $(this).find('.edu_list_info')
        .removeClass('edu_hover_out')
        .addClass('edu_hover_in');
  });
  $(".edu_list_info_event").mouseleave(function(){
    $(this).find('.edu_list_info')
        .removeClass('edu_hover_in')
        .addClass('edu_hover_out');
  });

})



// 섹션7_활동소식
$(function(){
  $("#news_btn1").addClass("section7_fontweight").siblings().removeClass("section7_fontweight");

    $(".section7_news_tap_btns>a").click(function(){
      $(".section7_news_details_box").removeClass("section7_displayblock");

      btnId = $(this).attr("id");
        if(btnId == "news_btn1"){
          $("#activityTap").removeClass("activityTap0");
          $("#newsTap").addClass("activityTap0");

          $("#activityTap").addClass("tap_on").siblings().removeClass("tap_on");
          $("#news_btn1").addClass("section7_fontweight").siblings().removeClass("section7_fontweight");
          
        }else if(btnId == "news_btn2"){
          $("#newsTap").removeClass("activityTap0");
          $("#activityTap").addClass("activityTap0");

          $("#newsTap").addClass("tap_on").siblings().removeClass("tap_on");
          $("#news_btn2").addClass("section7_fontweight").siblings().removeClass("section7_fontweight");
        }
    });

    $(".section7_news_list_titlebox").click(function(){
      
      $(".section7_news_details_box").removeClass("section7_displayblock");
      $(this).next(".section7_news_details_box").addClass("section7_displayblock");

    });

});



//섹션10_협력단체
$(function() {

  $(".partner_list_even, .partner_list_odd").css("position","relative");

  // 홀수 애니메이션
  function oddAction(){

    $(".partner_list_odd").each(function(){
      const $this = $(this);
      function loop(){
        $this.animate({bottom:"46px"}, 3500, "linear")
             .animate({bottom:"0px"}, 3500, "linear", loop);
        }
        loop();
    });
    
  }

  // 짝수 애니메이션
  function evenAction(){

    $(".partner_list_even").each(function(){
      const $this = $(this);
      function loop(){
        $this.animate({top:"46px"}, 3500,"linear")
             .animate({top:"0px"}, 3500, "linear", loop);
        }
        loop();
    });
    
  }

  function scrollAction(){

    $("#partner_list").animate({left:"-1976px"}, 40000, "linear", 
      function(){
        $("#partner_list").css("left","0px");
        scrollAction();
      });
  }

  //최초 실행
  scrollAction();
  oddAction();
  evenAction();

  $("#partner_list").hover(
    function(){
      $(".partner_list_even, .partner_list_odd,#partner_list").stop(true);
    },
    function(){
      scrollAction();
      oddAction();
      evenAction();
    }
  );

});



  
