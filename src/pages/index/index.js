// 首页使用的js

// 引入公共css
import "../common/reset.css";
import "./index.less";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
import swiper from "swiper";
import "./vue.min";


const bannerSwiper = new swiper(".banner-swiper", {
  pagination: {
    el: ".banner-pagination",
    type: "progressbar",
    clickable: true,
  },
  autoplay:{
    delay:3000
  },
  autoHeight:true,
  loop: true,
  on: {
    slideChangeTransitionStart: function () {
      // const video = $(".banner-item").eq(this.realIndex).find("video").get(0);
      // if(video){
      //   video.pause();
      // }
      let num = this.realIndex + 1;
      $(".banner-container .pagination-box .num.current").text(
        num.toString().padStart(2, 0)
      );
    },
    slideNextTransitionStart: function(){
      $(".banner-item").eq(this.realIndex).siblings().find("video").trigger("stop")
      $(".banner-item").eq(this.realIndex + 1).find("video").trigger("play");
    },
    slidePrevTransitionStart: function(){
      $(".banner-item").eq(this.realIndex + 1).siblings().find("video").trigger("stop")
      $(".banner-item").eq(this.realIndex).find("video").trigger("play");
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const numTotal = bannerSwiper.loopedSlides
  ? bannerSwiper.slides.length - 2
  : bannerSwiper.slides.length;

$(".banner-container .pagination-box .num.current").text(
  (bannerSwiper.realIndex + 1).toString().padStart(2, 0)
);
$(".banner-container .pagination-box .num.total").text(
  numTotal.toString().padStart(2, 0)
);
$(".technology-item").hover(function(){
  $(this).addClass("on").siblings().removeClass("on");
})

const vm = new Vue({
  el:"#case-vue",
  data(){
    return{
      caseList: [],
      index:0,
      limit:Math.ceil(window.caseList.length / 6)
    }
  },
  created(){
    this.getList();
  },
  methods:{
    getList(){
      const caseList = [...window.caseList];
      this.caseList = caseList.splice(this.index * 6,6);
    },
    changeIndex(index){
      console.log(index,this.index);
      if(index < 0 || index >= this.limit){
        return;
      }
      this.index = index;
      this.getList();
    }
  }
})