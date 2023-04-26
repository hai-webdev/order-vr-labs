// 头部的js代码
import "./index.less";
import "swiper/css/swiper.min.css";
import "wowjs/css/libs/animate.css";
import { WOW } from "wowjs";

new WOW().init();

$(".m-header .menu").on("click", function () {
  $(this).toggleClass("close");
  $(".m-header .nav-container").slideToggle();
});
