var RangeSlider = function () {
  var elRangeInputs = document.querySelectorAll(".range-input");

  function setProgress(elTarget) {
    var elRangeBar = elTarget.parentElement;
    var intThumbWidth = elRangeBar.clientHeight * 3;
    var intRangeBarWidth = elRangeBar.clientWidth - intThumbWidth;
    var intThumbWidthOffset = intThumbWidth / 2;

    var intProgressPosition =
      (elTarget.value - elTarget.min) / (elTarget.max - elTarget.min);
    var intRangePosition =
      intRangeBarWidth * intProgressPosition + intThumbWidthOffset;

    elRangeBar.style.background =
      "linear-gradient(to right, #df9609 " +
      intRangePosition +
      "px, #ffffff4d " +
      intRangePosition +
      "px";
  }

  for (var i = 0; i < elRangeInputs.length; i++) {
    elRangeInputs[i].firstElementChild.addEventListener("input", function () {
      setProgress(this);
    });

    setProgress(elRangeInputs[i].firstElementChild);
  }
};
RangeSlider();
var audio = document.querySelector("#audio");
var playBtn = document.querySelector(".btn-toggle-play");
var progress = document.querySelector("#progress");
var prevBtn = document.querySelector(".btn-prev");
var nextBtn = document.querySelector(".btn-next");
var randomBtn = document.querySelector(".btn-random");
var repeatBtn = document.querySelector(".btn-repeat");
var curtime = document.querySelector(".curr-time");
var durtime = document.querySelector(".dur-time");
var volRange = document.getElementById("rangeVolum");
var muteVolume = document.querySelector(".js-volume");
var seekbar = document.querySelector(".seekbar");

// xử lý hiện thời gian bài hát
setInterval(() => {
  curtime.textContent = formatTimer(audio.currentTime);
  durtime.textContent = formatTimer(audio.duration);
}, 1000);
function formatTimer(num) {
  var min = Math.floor(num / 60);
  var sec = Math.floor(num - min * 60);
  if (sec < 10) return `${min}:0${sec}`;
  else return `${min}:${sec}`;
}

var appSong = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Nevada",
      singer: "Vicetone",
      path: "./musics/1.mp3",
      time: "02:31",
    },
    {
      name: "SummerTime",
      singer: "K-391",
      path: "./musics/2.mp3",
      time: "01:29",
    },
    {
      name: "Monodi",
      singer: "TheFastRast",
      path: "./musics/3.mp3",
      time: "02:12",
    },
    {
      name: "Reality",
      singer: "Lost Frenquensies",
      path: "./musics/4.mp3",
      time: "03:25",
    },
    {
      name: "Ngay khac la",
      singer: "Tripide",
      path: "./musics/5.mp3",
      time: "02:03",
    },
    {
      name: "Sugar",
      singer: "Maron 5",
      path: "./musics/7.mp3",
      time: "02:02",
    },
    {
      name: "Mylove",
      singer: "westlife",
      path: "./musics/8.mp3",
      time: "01:43",
    },
    {
      name: "Attention",
      singer: "Chenest",
      path: "./musics/9.mp3",
      time: "02:16",
    },
    {
      name: "Monster",
      singer: "Keytykai",
      path: "./musics/10.mp3",
      time: "02:52",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;
    //  Xử lý play audio
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        this.firstElementChild.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
      } else {
        this.firstElementChild.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
      }
    };
    // Khi song được  play
    audio.onplay = function () {
      _this.isPlaying = true;
    };

    //  Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
    };

    // Khi tiến độ thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPersent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPersent;
      }
      RangeSlider();
    };

    // Xử lý khi tua
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      // audio.play();
    };

    // Xử lý next bài hát
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
        playBtn.firstElementChild.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        _this.nextSong();
        playBtn.firstElementChild.innerHTML = '<i class="fas fa-pause"></i>';
      }
      audio.play();
    };

    // Xử lý prev bài hát
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
        playBtn.firstElementChild.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        _this.prevSong();
        playBtn.firstElementChild.innerHTML = '<i class="fas fa-pause"></i>';
      }
      audio.play();
    };

    // Xử lý khi random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      if (!_this.isRepeat) {
        randomBtn.classList.toggle("active", _this.isRandom);
        repeatBtn.classList.toggle("disable");
      }
    };

    // Xử lý phát 1 bài liên tục
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      if (!_this.isRandom) {
        repeatBtn.classList.toggle("active", _this.isRepeat);
        randomBtn.classList.toggle("disable");
      }
    };

    // Xử lý next khi hêt bài
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.load();
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // change volume //
    volRange.onchange = function () {
      let count = this.value / 100;
      audio.volume = count;
    };
    var isMute = false;
    muteVolume.onclick = function () {
      if (isMute) {
        isMute = false;
        this.innerHTML = '<i class="fas fa-volume-up volume-icon"></i>';
        audio.muted = false;
      } else {
        isMute = true;
        this.innerHTML = '<i class="fas fa-volume-mute volume-icon"></i>';
        audio.muted = true;
      }
    };
  },
  //
  loadCurrentSong: function () {
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  startSong: function () {
    //Định nghia các thuộc tính của Object
    this.defineProperties();

    // xử lý các sự kiện
    this.handleEvent();

    // Tải thông tin của bài hát đầu tiên
    this.loadCurrentSong();
  },
};
appSong.startSong();
