/* Start Section kitsch_hair_growth_pdp_yxxRt3 */
const visibleQty=document.getElementById('Quantity');function increaseQty(){visibleQty.value=parseInt(visibleQty.value)+1;}
function decreaseQty(){if(parseInt(visibleQty.value)>1){visibleQty.value=parseInt(visibleQty.value)-1;}}
document.addEventListener("DOMContentLoaded",function(){const faqSections=document.querySelectorAll(".section-template--kitsch_hair_growth_pdp_yxxRt3 .main_faq_wrap");let firstfaq=true;faqSections.forEach(section=>{const details=section.querySelectorAll("details");if(details.length>0&&firstfaq){details[details.length-1].setAttribute("open",true);firstfaq=false;}});});
/* End Section kitsch_hair_growth_pdp_yxxRt3 */
/* Start Section kitsch_hair_growth_review_JEH4gc */
document.addEventListener('DOMContentLoaded',function(){var Swipes=new Swiper('.section-template--kitsch_hair_growth_review_JEH4gc .swiper',{loop:false,slidesPerView:1,spaceBetween:40,grabCursor:false,initialSlide:0,roundLengths:true,navigation:{nextEl:'.section-template--kitsch_hair_growth_review_JEH4gc .next',prevEl:'.section-template--kitsch_hair_growth_review_JEH4gc .prev',clickable:true,},breakpoints:{768:{slidesPerView:2,centeredSlides:false,loop:false,initialSlide:0,spaceBetween:20},1199:{slidesPerView:4,centeredSlides:false,loop:false,initialSlide:0,spaceBetween:20}},on:{init:function(){updateNavigationVisibility(this);},resize:function(){updateNavigationVisibility(this);},slideChange:function(){updateNavigationVisibility(this);}}});function updateNavigationVisibility(swiper){const totalSlides=swiper.slides.length;const slidesPerView=swiper.params.slidesPerView;const canShowAllSlides=totalSlides<=slidesPerView;const sliderControls=document.querySelector('.section-template--kitsch_hair_growth_review_JEH4gc .slider-controls');if(canShowAllSlides){sliderControls.style.display='none';}else{sliderControls.style.display='';}}});
/* End Section kitsch_hair_growth_review_JEH4gc */
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
if (!customElements.get('carousel-slider')) {
  class CarouselSlider extends HTMLElement {
    constructor() {
      super();
      this.activeIndex = 0;
    }

    connectedCallback() {
      this.init();
    }

    init() {
      this.cacheElements();
      this.bindEvents();
      this.scrollToMediaItem(this.activeIndex);
    }

    cacheElements() {
      this.mainMedia = this.querySelector('main-slider');
      this.thumbSlider = this.querySelector('thumb-slider');
      this.thumbVertical = this.thumbSlider?.dataset.vartical;
      this.pagenation = this.querySelector('pagenation');
      this.mediaItems = this.mainMedia?.querySelectorAll('main-slider-slide') || [];
      this.thumbItems = this.thumbSlider?.querySelectorAll('thumb-slider-slide') || [];
      this.pageItems = this.pagenation?.querySelectorAll('button.page-media-item') || [];
    }

    bindEvents() {
      const mediaBtnNext = this.querySelector('.media-next');
      const mediaBtnPrev = this.querySelector('.media-prev');

      mediaBtnNext?.addEventListener('click', () => this.goToNext());
      mediaBtnPrev?.addEventListener('click', () => this.goToPrev());

      this.thumbItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => this.scrollToMediaItem(index));
      });
    
      this.pageItems.forEach((page, index) => {
        page.addEventListener('click', () => this.scrollToMediaItem(index));
      });
    
      let scrollTimeout = null;
      this.mainMedia?.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => this.handleScrollSnap(), 200);
      });
    
      const updateThumbSliderHeight = () => {
        if (this.thumbVertical && window.innerWidth > 768) {
          this.thumbSlider.style.maxHeight = this.mainMedia.offsetHeight + 'px';
        } else {
          this.thumbSlider.style.maxHeight = ''; // Optional: reset height on small screens
        }
      };
      
      setTimeout(updateThumbSliderHeight, 200);
      
      window.addEventListener('resize', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateThumbSliderHeight, 200);
      });
    }

    handleScrollSnap() {
      const scrollLeft = this.mainMedia.scrollLeft;
      const itemWidth = this.mediaItems[0]?.clientWidth || 0;
      const offset = scrollLeft + this.mainMedia.offsetLeft;

      let closestIndex = 0;
      let minDiff = Infinity;
      this.mediaItems.forEach((item, i) => {
        const diff = Math.abs(item.offsetLeft - offset);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      });

      this.scrollToMediaItem(closestIndex);
    }

    goToNext() {
      if (this.activeIndex < this.mediaItems.length - 1) {
        this.scrollToMediaItem(this.activeIndex + 1);
      }
    }

    goToPrev() {
      if (this.activeIndex > 0) {
        this.scrollToMediaItem(this.activeIndex - 1);
      }
    }

    scrollToMediaItem(index) {
      if (!this.mediaItems.length) return;
    
      this.mediaItems[this.activeIndex]?.classList.remove('active');
      this.thumbItems[this.activeIndex]?.classList.remove('active');
      this.pageItems[this.activeIndex]?.classList.remove('active');
      
      const video_player = this.mediaItems[this.activeIndex].querySelector('video-player');
      
      this.activeIndex = index;
      
      if (video_player) {
        video_player.pauseAllVideo();
      }
    
      this.mediaItems[this.activeIndex]?.classList.add('active');
      this.thumbItems[this.activeIndex]?.classList.add('active');
      this.pageItems[this.activeIndex]?.classList.add('active');
    
      const scrollLeft = this.mediaItems[this.activeIndex].offsetLeft - this.mainMedia.offsetLeft;
      this.mainMedia.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    
      const thumbScroll = this.thumbItems[this.activeIndex].offsetLeft - this.thumbSlider.offsetLeft - ((this.thumbSlider.clientWidth / 2) - (this.thumbItems[this.activeIndex].clientHeight / 2));
      this.thumbSlider.scrollTo({ left: thumbScroll, behavior: 'smooth' });
    }

    refresh(index = 0) {
      this.activeIndex = index;
      this.cacheElements();
      this.bindEvents();
    }

    createCustomCarouselSlide(data, isThumbnail = false) {
      const slideTag = isThumbnail ? 'thumb-slider-slide' : 'main-slider-slide';
      const slideClass = isThumbnail ? 'thumb-media-item' : 'main-media-item';
      const slide = document.createElement(slideTag);
      slide.className = slideClass;
      slide.id = isThumbnail ? undefined : `wwai-media-${data.id}`;
  
      const img = document.createElement('img');
      img.src = isThumbnail ? `${data.src}&width=${data.width}` : data.src;
      img.alt = data.alt || "Image";
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

    gotoSlide(index) {
      if (!this.mediaItems.length) return;
  
      if (index < 0) {
        const resolvedIndex = this.mediaItems.length + index;
        this.scrollToMediaItem(resolvedIndex);
      } else {
        this.scrollToMediaItem(index);
      }
    }

    clearSlides() {
      this.mainMedia.innerHTML = '';
      this.thumbSlider.innerHTML = '';
      this.mediaItems = [];
      this.thumbItems = [];
      this.activeIndex = 0;
    }
  }
  
  customElements.define('carousel-slider', CarouselSlider);
}

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
      pauseAllVideo() {
        this.videos.forEach(video => {
          this.pauseVideo(video)
        });
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