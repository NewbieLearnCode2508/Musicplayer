
//Render bài hát--> OK
//Scroll thì thu nhỏ--> OK
//CD quay--> OK
//play / pause /seek--> OK
//next / repeat--> OK
//random song--> OK
//active song--> OK
//scroll active song into view--> OK
//Play song when click--> OK
//Nhấn để tua tới/lùi--> OK
//chỉnh âm lượng tăng/ giảm/ tắt âm--> OK
//Thanh tiến độ--> OK
//Nút tua tới và lui
//Hiệu ứng hover vào bài hát

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Player_Music_App';

const player = $('.player')
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const processPlay = $('.progress');
const progressLine = $('.progress-line');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const playlist = $('.playlist');
const volume = $('#volume');
const volumeBtn = $('.btn-volume');
const volumeAudio = audio.volume;
var lastSongs = [];

const app = {
    currentIndex: 0,
    isPlay: false,
    isRepeat: false,
    isRandom:false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
            {
                name: 'Cô thắm về làng',
                singer: 'Phát Hồ',
                path: './asset/song/Côthắmkhôngvề.mp3',
                img: './asset/img/Côthắmkhôngvề.png'
            },
            {
                name: 'Sai lầm lớn nhất',
                singer: 'Đình Dũng',
                path: './asset/song/Sailầmcủaanh.mp3',
                img: './asset/img/Sailầmlớnnhất.png'
            },
            {
                name: 'Cô dâu đẹp nhất',
                singer: 'Hai bạn nam',
                path: './asset/song/Côdâuđẹpnhất.mp3',
                img: './asset/img/Côdâuđẹpnhất.png'
            },
            {
                name: 'Let her go',
                singer: 'Passenger',
                path: './asset/song/Lethergo.mp3',
                img: './asset/img/Lethergo.png'
            },
            {
                name: 'Khuê mộc lan',
                singer: 'Hương Ly & Jombie',
                path: './asset/song/Khuêmộclan.mp3',
                img: './asset/img/Khuêmộclan.png'
            },
            {
                name: 'That girl',
                singer: 'Olly Murs',
                path: './asset/song/That Girl.mp3',
                img: './asset/img/Thatgirl.png'
            },
            {
                name: 'sakura anata ni deaete',
                singer: 'Night core',
                path: './asset/song/Sakura anata ni deaete yokatta.mp3',
                img: './asset/img/sakuraanatanideaete.png'
            },
            {
                name: 'Lối Nhỏ',
                singer: 'Đen Vâu',
                path: './asset/song/Đen - Lối Nhỏ.mp3',
                img: './asset/img/Lốinhỏ.png'
            },
            {
                name: 'Muốn Được cùng em',
                singer: 'Đen Vâu',
                path: './asset/song/Muốnđượccùngem.mp3',
                img: './asset/img/Muốnđượccùngem.png'
            },
            {
                name: 'Cô đơn bao lâu anh mới biết',
                singer: 'Đen Vâu',
                path: './asset/song/Cô đơn bao lâu anh mới biết.mp3',
                img: './asset/img/Côđơnbaolâuanhmớibiết.png'
            },
            {
                name: 'Sẽ chẳng yêu người khác đâu',
                singer: 'Đen Vâu',
                path: './asset/song/Sẽ chẳng yêu người khác đâu.mp3',
                img: './asset/img/Sẽchẳngyêungườikhácđâu.png'
            },
            {
                name: 'Kiss me more',
                singer: 'Doja Cat',
                path: './asset/song/Kiss Me More.mp3',
                img: './asset/img/kissmemore.png'
            },
            {
                name: 'Khó vẽ nụ cười',
                singer: 'Đạt G x DuUyên',
                path: './asset/song/Khó Vẽ Nụ Cười.mp3',
                img: './asset/img/Khóvẽnụcười.png'
            },
            {
                name: 'Tình Đơn Phương',
                singer: 'Edward Dương Nguyễn',
                path: './asset/song/TÌNH ĐƠN PHƯƠNG ACOUSTIC.mp3',
                img: './asset/img/Tìnhđơnphương.png'
            },
            {
                name: 'Chưa bao giờ',
                singer: 'Trung Quân',
                path: './asset/song/Chua bao giờ.mp3',
                img: './asset/img/Chưabaogiờ.png'
            },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    handleEvents: function() {
        var _this = this;
        const cdWidth = cd.offsetWidth;

        //Xử lý quay đĩa
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'},
        ], {
            duration: 10000,
            iterations: Infinity
        });
        
        cdThumbAnimate.pause();

        //Xử lý phóng to thu nhỏ CD
        document.onscroll = ()=> {
            const scrollApp = document.documentElement.scrollTop || window.scrollY;
            const newWidth = cdWidth - scrollApp;
            if (newWidth > 0) {
                cd.style.width = newWidth + 'px';
                cd.style.opacity = (newWidth / cdWidth);
            }else {
                cd.style.width = 0 + 'px';
            }
        }

        //Xử lý khi click play music
        playBtn.onclick = function() {
            if (_this.isPlay) {
                _this.pauseSong();
                cdThumbAnimate.pause();
                player.classList.remove('playing');
            }else {
                audio.play();
                cdThumbAnimate.play();
                player.classList.add('playing');
            }
            _this.isPlay = !_this.isPlay;
        }

        //Nhấn backspace để tạm ngưng
        window.onkeypress = (e)=> {
            e.preventDefault();
            if(e.keyCode === 32) {
                if(e.target == document.body) {
                    e.preventDefault();
                }
                if(_this.isPlay === true) {
                    playBtn.click();
                }else {
                    playBtn.click();
                }
            }
        }

        //Tiến độ play và tua
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const processPercent = Math.floor(audio.currentTime / audio.duration * 100);
                processPlay.value = processPercent;
                progressLine.style.width = processPercent + '%';
            }
        }

        processPlay.oninput = function() {
            progressLine.style.width = processPlay.value + '%';
            audio.pause();
        }

        processPlay.onclick = (e) => {
            processPlay.onchange = (e)=> {
                const seekTime = (audio.duration / 100) * e.target.value
                audio.currentTime = seekTime;
                if(_this.isPlay) {
                    audio.play();
                }else {
                    _this.playSong();
                    cdThumbAnimate.play();
                }
            }
        }

        //Xử lý nhấn tua bài hát
        window.onkeydown = (e)=> {
            if(e.keyCode === 39) {
                const seekTime = audio.currentTime + 10;
                audio.currentTime = seekTime;
            }

            if(e.keyCode === 37) {
                let seekTime = audio.currentTime - 10;
                if(seekTime < 0) {
                    seekTime = 0;
                }
                audio.currentTime = seekTime;
            }
        }

        //Xử lý khi chuyển bài hát
        nextBtn.onclick = ()=> {
            if (_this.isRandom) {
                _this.playRandomSong();
            }else{
                _this.nextSong();
            }
            _this.playSong();
            cdThumbAnimate.play();
            _this.render();
            _this.scrollToActiveSong();
        }
    
        prevBtn.onclick = ()=> {
            if (_this.isRandom) {
                _this.playRandomSong();
            }else {
                _this.prevSong();
            }
            _this.loadCurrentSong();
            _this.playSong();
            cdThumbAnimate.play();
            _this.scrollToActiveSong();
            _this.render();
        }
        
        //Xử lý lặp lại
        repeatBtn.onclick = ()=> {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            //Xử lý khi nhấn repeatBtn
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        
        //Xử lý khi end song
        audio.onended = ()=> {
            if (_this.isRepeat) {
                audio.play();
            }else {
                nextBtn.click();
            }
        }

        //Xử lý random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');

            if(songNode || !e.target.closest('.option')) {
                
                if(songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'));
                    _this.loadCurrentSong();    
                    _this.playSong();
                    cdThumbAnimate.play();
                    _this.render();
                }
            }
        }

        //Xử lý tăng giảm âm thanh
        volume.onchange = function() {
            _this.setVolume(volume.value); 
        };

        //Xử lý tắt bật âm thanh
        volumeBtn.onclick = ()=> {
            volumeBtn.classList.toggle('active');
            _this.isMute = !_this.isMute;
            if(_this.isMute === true) {
               audio.muted = true;
            }else {
               audio.muted = false;
            }
        }
    },
    playSong: function() {
        audio.play();
        this.isPlay = true;
        player.classList.add('playing');
    },
    setVolume: function(currentVolume) {
        audio.volume = Number(currentVolume) / 100;
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    pauseSong: function() {
        audio.pause();
    },
    scrollToActiveSong: function() {
        setTimeout(()=> {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500)
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`;
        audio.src = this.currentSong.path;
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        
        //random index song
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex)
        
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
    },
    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return`
            <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
        })
        playlist.innerHTML = htmls.join('');
    },
    start: function() {
        //Load config
        this.loadConfig();

        //Dinh nghia cac thuoc tinh cho Object
        this.definedProperties();

        //Lắng nghe các sự kiện
        this.handleEvents();

        //Tải bài hát đầu tiên khi load trang web
        this.loadCurrentSong();

        //render ra list bài hát
        this.render();

        this.scrollToActiveSong();

        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
    
}
app.start();