/* Start Section kitsch_hair_growth_pdp_yxxRt3 */
const visibleQty=document.getElementById('Quantity');function increaseQty(){visibleQty.value=parseInt(visibleQty.value)+1;}
function decreaseQty(){if(parseInt(visibleQty.value)>1){visibleQty.value=parseInt(visibleQty.value)-1;}}
document.addEventListener("DOMContentLoaded",function(){const faqSections=document.querySelectorAll(".section-template--kitsch_hair_growth_pdp_yxxRt3 .main_faq_wrap");let firstfaq=true;faqSections.forEach(section=>{const details=section.querySelectorAll("details");if(details.length>0&&firstfaq){details[details.length-1].setAttribute("open",true);firstfaq=false;}});});
/* End Section kitsch_hair_growth_pdp_yxxRt3 */
/* Start Section kitsch_hair_growth_review_JEH4gc */
document.addEventListener('DOMContentLoaded',function(){var Swipes=new Swiper('.section-template--kitsch_hair_growth_review_JEH4gc .swiper',{loop:false,slidesPerView:1,spaceBetween:40,grabCursor:false,initialSlide:0,roundLengths:true,navigation:{nextEl:'.section-template--kitsch_hair_growth_review_JEH4gc .next',prevEl:'.section-template--kitsch_hair_growth_review_JEH4gc .prev',clickable:true,},breakpoints:{768:{slidesPerView:2,centeredSlides:false,loop:false,initialSlide:0,spaceBetween:20},1199:{slidesPerView:4,centeredSlides:false,loop:false,initialSlide:0,spaceBetween:20}},on:{init:function(){updateNavigationVisibility(this);},resize:function(){updateNavigationVisibility(this);},slideChange:function(){updateNavigationVisibility(this);}}});function updateNavigationVisibility(swiper){const totalSlides=swiper.slides.length;const slidesPerView=swiper.params.slidesPerView;const canShowAllSlides=totalSlides<=slidesPerView;const sliderControls=document.querySelector('.section-template--kitsch_hair_growth_review_JEH4gc .slider-controls');if(canShowAllSlides){sliderControls.style.display='none';}else{sliderControls.style.display='';}}});
/* End Section kitsch_hair_growth_review_JEH4gc */

class CarouselSlider extends HTMLElement {
    constructor() {
      super();
      this.activeIndex = 0;
    }
    
    connectedCallback() {
      this.init();
    }
  
    init() {
      this.setupSliders();
      this.setupEventListeners();
    }
  
    setupSliders() {
      this.mainMedia = this.querySelector('main-slider');
      this.thumbSlider = this.querySelector('thumb-slider');
      this.mediaItems = this.mainMedia.querySelectorAll('main-slider-slide');
      this.thumbItems = this.thumbSlider.querySelectorAll('thumb-slider-slide');
    }
  
    setupEventListeners() {
      const mediaBtnNext = this.querySelector('.media-next');
      const mediaBtnPrev = this.querySelector('.media-prev');
  
      const scrollToMediaItem = (index) => {
        this.mediaItems[this.activeIndex].classList.remove('active');
        this.thumbItems[this.activeIndex].classList.remove('active');
  
        this.activeIndex = index;
  
        this.mediaItems[this.activeIndex].classList.add('active');
        this.thumbItems[this.activeIndex].classList.add('active');
  
        const scrollLeft = this.mediaItems[index].offsetLeft - this.mainMedia.offsetLeft;
        this.mainMedia.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
  
        const scrollThumbLeft = this.thumbItems[index].offsetLeft - this.thumbSlider.offsetLeft - ((this.thumbSlider.clientWidth / 2) - (this.thumbItems[index].clientHeight / 2));
        this.thumbSlider.scrollTo({
          left: scrollThumbLeft,
          behavior: 'smooth'
        });
      };
  
      mediaBtnNext?.addEventListener('click', () => {
        if (this.activeIndex < this.mediaItems.length - 1) {
          scrollToMediaItem(this.activeIndex + 1);
        }
      });
  
      mediaBtnPrev?.addEventListener('click', () => {
        if (this.activeIndex > 0) {
          scrollToMediaItem(this.activeIndex - 1);
        }
      });
  
      this.thumbItems.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
          scrollToMediaItem(index);
        });
      });
  
      let scrollTimeout = null;
      this.mainMedia.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPosition = this.mainMedia.scrollLeft;
          const mediaWidth = this.mediaItems[0].clientWidth;
          const currentElement = this.mediaItems[this.activeIndex];
          const prevElement = this.mediaItems[this.activeIndex - 1];
          const nextElement = this.mediaItems[this.activeIndex + 1];
          const scrollRelativeToCurrent = scrollPosition - (currentElement.offsetLeft - this.mainMedia.offsetLeft);
          if (scrollRelativeToCurrent < -(mediaWidth / 2)) {
            if (prevElement) {
              scrollToMediaItem(this.activeIndex - 1);
            }
          } else if (scrollRelativeToCurrent < (mediaWidth / 2)) {
            scrollToMediaItem(this.activeIndex);
          } else if (scrollRelativeToCurrent > (mediaWidth / 2)) {
            if (nextElement) {
              scrollToMediaItem(this.activeIndex + 1);
            }
          }
        }, 200);
      });
      
      scrollToMediaItem(this.activeIndex);
    }
  
    refresh(index) {
      this.activeIndex = index;
      this.setupSliders();
      this.setupEventListeners();
    }
}
  
customElements.define('carousel-slider', CarouselSlider);
  
(function () {
  window.WWAIShopifyUtils = window.WWAIShopifyUtils || {}; // Ensure namespace exists
    
  window.WWAIShopifyUtils.createCustomCarouselSlide = function (data, isThumbnail = false) {
    const slideTag = isThumbnail ? 'thumb-slider-slide' : 'main-slider-slide';
    const slideClass = isThumbnail ? 'thumb-media-item' : 'main-media-item';
    const slide = document.createElement(slideTag);
    slide.className = slideClass;
    slide.id = isThumbnail ? undefined : `nwkw_pdp-media-${data.id}`;
    
    const img = document.createElement('img');
    img.src = isThumbnail ? `${data.src}&width=${data.width}` : data.src;
    img.alt = data.alt || "7&quot; Teton Edge Santoku";
    img.width = data.width;
    img.height = data.height;
    img.loading = 'lazy';
    img.className = isThumbnail ? 'thumb-media-img' : 'main-media-img';
  
    const srcset = isThumbnail 
      ? `${data.src}&width=${data.width} ${data.width}w`
      : [
          `${data.src}&width=352 352w`,
          `${data.src}&width=832 832w`,
          `${data.src}&width=1200 1200w`,
          `${data.src}&width=1920 1920w`,
          `${data.src}&width=2561 2561w`
        ].join(', ');
  
    img.setAttribute('srcset', srcset);
    img.setAttribute('sizes', '(min-width: 1536px) 1500px,(min-width: 1280px) 1250px,(min-width: 768px) 994px,(min-width: 768px) 708px,(min-width: 640px) 610px,100vw');
  
    if (isThumbnail) {
      slide.setAttribute('data-handle', `media-${data.id}`);
      slide.setAttribute('data-img-id', data.src);
    }
  
    slide.appendChild(img);
    return slide;
  }
})();
/*
class VideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.videos = this.querySelectorAll('video');
    this.videoWeb = this.videos[0];
    this.videoMob = this.videos[1];
    this.playBtn = this.querySelector('.play-btn');
    this.soundBtn = this.querySelector('.mute-btn');
    this.disableClick = this.dataset.click;
    if (this.disableClick) {
      this.initEventListeners();
    }
  }

  initEventListeners() {
    this.videos.forEach(video => {
      video.addEventListener('click', () => this.togglePlay(video));
      video.addEventListener('ended', () => this.handleVideoEnded(video)); // Listen for the `ended` event
    });

    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.handlePlayButton());
    }

    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', () => this.toggleMute());
    }

    window.addEventListener('resize', () => this.handleResize());
  }

  togglePlay(video) {
    if (video.paused) {
      this.playVideo(video);
    } else {
      this.pauseVideo(video);
    }
  }

  playVideo(video) {
    this.videos.forEach(otherVideo => {
      if (otherVideo !== video) otherVideo.pause();
    });
    video.play();
    this.classList.add('played');
  }

  pauseVideo(video) {
    video.pause();
    this.classList.remove('played');
  }

  handlePlayButton() {
    const targetVideo = window.innerWidth < 749 && this.videoMob ? this.videoMob : this.videoWeb;
    if (targetVideo) this.togglePlay(targetVideo);
  }

  toggleMute() {
    const targetVideo = window.innerWidth < 749 && this.videoMob ? this.videoMob : this.videoWeb;
    if (targetVideo) {
      targetVideo.muted = !targetVideo.muted;
      this.soundBtn.classList.toggle('active', targetVideo.muted);
    }
  }

  handleResize() {
    if (!this.videoMob) return;

    const isMobile = window.innerWidth < 749;
    const targetVideo = isMobile ? this.videoMob : this.videoWeb;

    this.videos.forEach(video => video.pause());
    targetVideo.play();
    targetVideo.pause(); // Ensure the video is ready for user interaction
  }

  handleVideoEnded(video) {
    // Check if the video is not set to loop
    if (!video.loop) {
      this.classList.remove('played');
    }
  }
}

customElements.define('video-player', VideoPlayer);
*/
(function () {
  // Check if the custom element is already defined
  if (!customElements.get('video-player')) {
    class VideoPlayer extends HTMLElement {
      constructor() {
        super();
        this.videos = this.querySelectorAll('video');
        this.videoWeb = this.videos[0];
        this.videoMob = this.videos[1];
        this.playBtn = this.querySelector('.play-btn');
        this.soundBtn = this.querySelector('.mute-btn');
        this.disableClick = this.dataset.click;

        if (this.disableClick) {
          this.initEventListeners();
        }
      }

      initEventListeners() {
        this.videos.forEach(video => {
          video.addEventListener('click', () => this.togglePlay(video));
          video.addEventListener('ended', () => this.handleVideoEnded(video));
        });

        if (this.playBtn) {
          this.playBtn.addEventListener('click', () => this.handlePlayButton());
        }

        if (this.soundBtn) {
          this.soundBtn.addEventListener('click', () => this.toggleMute());
        }

        window.addEventListener('resize', () => this.handleResize());
      }

      togglePlay(video) {
        if (video.paused) {
          this.playVideo(video);
        } else {
          this.pauseVideo(video);
        }
      }

      playVideo(video) {
        this.videos.forEach(otherVideo => {
          if (otherVideo !== video) {
            otherVideo.pause();
            otherVideo.muted = true;
          }
        });

        video.muted = false;
        video.play();
        this.classList.add('played');

        // ✅ Hide the Play button
        if (this.playBtn) {
          this.playBtn.style.opacity = '0';
          this.playBtn.style.pointerEvents = 'none'; // Prevent clicking while hidden
        }

        if (this.soundBtn) {
          this.soundBtn.classList.remove('active');
        }
      }

      pauseVideo(video) {
        video.pause();
        video.muted = true;
        this.classList.remove('played');

        // ✅ Show the Play button again
        if (this.playBtn) {
          this.playBtn.style.opacity = '1';
          this.playBtn.style.pointerEvents = 'auto';
        }

        if (this.soundBtn) {
          this.soundBtn.classList.add('active');
        }
      }

      handlePlayButton() {
        const targetVideo = window.innerWidth < 749 && this.videoMob ? this.videoMob : this.videoWeb;
        if (targetVideo) this.togglePlay(targetVideo);
      }

      toggleMute() {
        const targetVideo = window.innerWidth < 749 && this.videoMob ? this.videoMob : this.videoWeb;
        if (targetVideo) {
          targetVideo.muted = !targetVideo.muted;
          this.soundBtn.classList.toggle('active', targetVideo.muted);
        }
      }

      handleResize() {
        if (!this.videoMob) return;

        const isMobile = window.innerWidth < 749;
        const targetVideo = isMobile ? this.videoMob : this.videoWeb;

        this.videos.forEach(video => {
          video.pause();
          video.muted = true;
        });

        targetVideo.play();
        targetVideo.muted = false;
        targetVideo.pause();
      }

      handleVideoEnded(video) {
        if (!video.loop) {
          this.classList.remove('played');
          video.muted = true;

          // ✅ Show the Play button again
          if (this.playBtn) {
            this.playBtn.style.opacity = '1';
            this.playBtn.style.pointerEvents = 'auto';
          }
        }
      }
    }

    // Define the custom element
    customElements.define('video-player', VideoPlayer);
  }
})();

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
