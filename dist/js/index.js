$(function(){FastClick.attach(document.body);var n={};n.init=function(){n.page1(),n.loadLine()},n.initSwipper=function(){n.mainSwiper=new Swiper(".swiper-container-main",{direction:"vertical",onInit:function(n){},onSlideChangeEnd:function(n){}}),n.subSwiper=new Swiper(".swiper-container-sub",{direction:"horizontal",pagination:".swiper-pagination",paginationClickable:!0,onInit:function(n){},onSlideChangeEnd:function(n){}})},n.loadLine=function(){var i=0;n.timer=setInterval(function(){i>=170&&(clearInterval(n.timer),n.tryNow()),$(".load-line-inner").width(i),i++},20)},n.page1=function(){$(".page1").css("opacity",1).show(),$(".page2").show()},n.tryNow=function(){$(".load-line").hide(),$(".try-now").show();var i=$("#start-video")[0];$(document).on("click",".try-now",function(){i.load(),i.play(),n.page2(),setTimeout(function(){$("#start-video-jump").fadeIn()},5e3)})},n.page2=function(){$(".page1").hide(),$(".page2").show();var i=$("#start-video")[0];console.log($(".page3").css("display")),setTimeout(function(){$(".page3").css({display:"block","z-index":"-10"}),console.log($(".page3").css("display"))},2e3),i.addEventListener("ended",function(){$(".page2").hide(),n.page3()}),$(document).on("click","#start-video-jump",function(){i.pause(),$(".page2").hide(),n.page3()})},n.page3=function(){$(".page3").css("z-index",1).show(),n.initSwipper(),$.each($(".video-full"),function(n,i){i.addEventListener("ended",function(){$(i).parents(".video-full-container").hide()})}),$(document).on("click",".video-pic",function(){var n=$(this).index(".video-pic");$(".video-full-container").eq(n).show().find(".video-full")[0].play()}),$(document).on("click",".video-close",function(){$(this).siblings(".video-box").find(".video-full")[0].pause(),$(this).parents(".video-full-container").hide()}),$(document).on("click",".slide3-line-btn",function(){window.location.href="https://cloud.tencent.com/act/event/wx-video.html"})},n.init()});