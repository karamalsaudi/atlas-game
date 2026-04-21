
// Responsive viewport handling
function handleViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        document.head.appendChild(meta);
    }
}

// Touch device detection and optimization
function optimizeForTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
        // Improve touch response
        document.querySelectorAll('.nav-item, .main-glass-card, .identity-card-3d, .quiz-box-3d, .epic-btn, .ctrl-btn, .accordion-btn').forEach(el => {
            el.style.setProperty('-webkit-tap-highlight-color', 'transparent');
        });
    }
}

// Handle orientation change
function handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
            // Recalculate layout
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                contentArea.style.height = window.innerHeight + 'px';
            }
        }, 100);
    });
}

// Handle resize events
function handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Adjust content area height
            const contentArea = document.querySelector('.content-area');
            const header = document.querySelector('.site-header');
            const footer = document.querySelector('.main-footer');
            
            if (contentArea && header && footer) {
                const headerHeight = header.offsetHeight;
                const footerHeight = footer.offsetHeight;
                contentArea.style.height = `calc(100vh - ${headerHeight + footerHeight}px)`;
            }
        }, 250);
    });
}

// Initialize responsive features
document.addEventListener('DOMContentLoaded', () => {
    handleViewport();
    optimizeForTouch();
    handleOrientationChange();
    handleResize();
    
    // Initial height calculation
    setTimeout(() => {
        const contentArea = document.querySelector('.content-area');
        const header = document.querySelector('.site-header');
        const footer = document.querySelector('.main-footer');
        
        if (contentArea && header && footer) {
            const headerHeight = header.offsetHeight;
            const footerHeight = footer.offsetHeight;
            contentArea.style.height = `calc(100vh - ${headerHeight + footerHeight}px)`;
        }
    }, 500);
});

particlesJS("particles-js", {
    "particles": {
        "number": { "value": 90 },
        "color": { "value": ["#00d4ff", "#00ff88"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.7 },
        "size": { "value": 3 },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00d4ff",
            "opacity": 0.4,
            "width": 1.5
        },
        "move": {
            "enable": true,
            "speed": 2.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "grab": { "distance": 250, "line_linked": { "opacity": 0.9, "color": "#00ff88" } }
        }
    }
});


window.onload = () => {
    gsap.fromTo("#intro-step-1", 
        { opacity: 0, scale: 0.5, translateZ: -800, rotationX: 20 }, 
        { opacity: 1, scale: 1, translateZ: 0, rotationX: 0, duration: 1.5, ease: "back.out(1.5)" }
    );
};

function goToIntroStep2() {
    const step1 = document.getElementById('intro-step-1');
    const step2 = document.getElementById('intro-step-2');
    
    step2.style.display = 'flex';
    
    const tl = gsap.timeline();
    tl.to(step1, { opacity: 0, rotationY: 90, translateZ: -500, duration: 1, ease: "power3.inOut" })
      .set(step1, { display: 'none' })
      .fromTo(step2, 
        { opacity: 0, rotationY: -90, translateZ: -500 }, 
        { opacity: 1, rotationY: 0, translateZ: 0, duration: 1, ease: "power3.out" }
      );
}

function enterMainSite() {
    const introScreen = document.getElementById('epic-intro-screen');
    const step2 = document.getElementById('intro-step-2');
    const mainSite = document.getElementById('main-site-content');
    
    mainSite.style.pointerEvents = 'auto';
    
    const tl = gsap.timeline({
        onComplete: () => {
            introScreen.style.display = 'none';
        }
    });

    tl.to(step2, { opacity: 0, scale: 3, translateZ: 800, duration: 1.2, ease: "power3.in" })
      .to(introScreen, { opacity: 0, duration: 0.5 }, "-=0.5")
      .set(mainSite, { opacity: 1 }) 
      .call(() => { navigateTo('home'); })
      .fromTo(".site-header", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=0.2")
      .fromTo(".main-footer", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.2")
      .fromTo(".hero-grid-container", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.5)" }, "-=1.2");
}

const sectionIds = ["home", "about", "identity", "museum", "feedback", "quiz", "download"];
const navTranslations = {
    home: "الرئيسية",
    about: "التعريف",
    identity: "الهوية الشخصية",
    museum: "المتحف",
    feedback: "التقييم",
    quiz: "المسابقة",
    download: "التحميل"
};

function navigateTo(id) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(s => {
        s.classList.remove('active');
        s.style.animation = 'none';
    });
    
    const video = document.getElementById('game-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (video && !video.paused) {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    setTimeout(() => {
        document.getElementById(id).classList.add('active');
        document.getElementById(id).style.animation = '';
    }, 10);
    
    renderNav(id);
}

function renderNav(currentId) {
    const dock = document.getElementById('nav-menu');
    dock.innerHTML = '';
    sectionIds.forEach(id => {
        if (id !== currentId) {
            const btn = document.createElement('div');
            btn.className = 'nav-item';
            btn.innerText = navTranslations[id];
            btn.onclick = () => navigateTo(id);
            dock.appendChild(btn);
        }
    });
}

function handleCardClick(dropId) {
    event.stopPropagation();
    const target = document.getElementById(dropId);
    const isShowing = target.classList.contains('show');
    document.querySelectorAll('.expandable-content').forEach(c => c.classList.remove('show'));
    if (!isShowing) {
        target.classList.add('show');
    }
}

function toggleAccordion(id) {
    const panel = document.getElementById(id);
    panel.classList.toggle('active');
}

const video = document.getElementById('game-video');
const playPauseBtn = document.getElementById('play-pause-btn');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const speedBtn = document.getElementById('speed-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const videoWrapper = document.getElementById('video-wrapper');

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted || video.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeSlider.value = 0;
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeSlider.value = video.volume;
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        video.volume = e.target.value;
        video.muted = false;
        if (video.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    let speeds = [1, 1.5, 2, 0.5];
    let currentSpeedIdx = 0;
    speedBtn.addEventListener('click', () => {
        currentSpeedIdx = (currentSpeedIdx + 1) % speeds.length;
        video.playbackRate = speeds[currentSpeedIdx];
        speedBtn.innerText = speeds[currentSpeedIdx] + 'x';
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            if (videoWrapper.requestFullscreen) { videoWrapper.requestFullscreen(); }
            else if (videoWrapper.webkitRequestFullscreen) { videoWrapper.webkitRequestFullscreen(); }
            else if (videoWrapper.msRequestFullscreen) { videoWrapper.msRequestFullscreen(); }
        } else {
            if (document.exitFullscreen) { document.exitFullscreen(); }
        }
    });
}

function openMuseumModal(imgSrc, name, desc) {
    const modal = document.getElementById('museum-modal');
    const imgElement = document.getElementById('museum-modal-img');
    const iconElement = document.getElementById('museum-modal-icon');
    
    if(imgSrc && imgSrc !== '') {
        imgElement.src = imgSrc;
        imgElement.style.display = 'block';
        iconElement.style.display = 'none';
    } else {
        imgElement.style.display = 'none';
        iconElement.innerText = (name.includes('المسابقة')) ? '🎯' : '💠';
        iconElement.style.display = 'block';
    }
    
    const nameElement = document.getElementById('museum-modal-name');
    nameElement.innerText = name;
    nameElement.style.animation = 'none';
    setTimeout(() => { nameElement.style.animation = ''; }, 10);
    
    document.getElementById('museum-modal-desc').innerText = desc;
    modal.classList.add('active');
}

function closeMuseumModal(event) {
    if (event.target.id === 'museum-modal' || event.target.closest('.close-modal-btn')) {
        document.getElementById('museum-modal').classList.remove('active');
    }
}

function openIdModal(name, desc, imgSrc) {
    const modal = document.getElementById('id-modal');
    const imgElement = document.getElementById('id-modal-img');
    const placeholder = document.getElementById('id-modal-placeholder');
    
    if(imgSrc && imgSrc !== '') {
        imgElement.src = imgSrc;
        imgElement.style.display = 'block';
        placeholder.style.display = 'none';
    } else {
        imgElement.style.display = 'none';
        placeholder.style.display = 'block';
    }
    
    document.getElementById('id-modal-name').innerText = name;
    document.getElementById('id-modal-desc').innerText = desc;
    modal.classList.add('active');
}

function closeIdModal(event) {
    if (event.target.id === 'id-modal' || event.target.closest('.id-close')) {
        document.getElementById('id-modal').classList.remove('active');
    }
}

function openSocialModal(email, whatsapp, insta) {
    const modal = document.getElementById('social-modal');
    document.getElementById('social-email-link').href = `mailto:${email}`;
    document.getElementById('social-wa-link').href = `https://wa.me/${whatsapp}`;
    document.getElementById('social-insta-link').href = `https://instagram.com/${insta}`;
    modal.classList.add('active');
}

function closeSocialModal(event) {
    if (event.target.id === 'social-modal' || event.target.closest('.social-close')) {
        document.getElementById('social-modal').classList.remove('active');
    }
}


document.addEventListener('mousemove', (e) => {
    const xPos = (window.innerWidth / 2 - e.pageX) / 45;
    const yPos = (window.innerHeight / 2 - e.pageY) / 45;
    
    gsap.to(".logo-3d-frame, .main-glass-card, .video-container-3d, .hologram-core-container, .modal-3d-content, .form-3d-wrapper, .quiz-box-3d, .question-box-3d, .identity-card-3d", {
        rotationY: xPos,
        rotationX: -yPos,
        duration: 1.5,
        ease: "power2.out"
    });
});

let selectedRating = 0;
document.querySelectorAll('#main-stars i').forEach(star => {
    star.onclick = function() {
        document.querySelectorAll('#main-stars i').forEach(s => s.classList.remove('active'));
        selectedRating = this.dataset.rating;
        document.querySelectorAll('#main-stars i').forEach((s, index) => {
            if(s.dataset.rating <= selectedRating) {
                setTimeout(() => { s.classList.add('active'); }, index * 50);
            }
        });
    };
});

function processFeedback() {
    const btn = document.getElementById('submit-btn');
    if (selectedRating === 0) {
        btn.innerText = "اختر تقييماً أولاً ⚠️";
        btn.style.background = "#ff004c";
        btn.style.boxShadow = "0 0 20px #ff004c";
        setTimeout(() => {
            btn.innerText = "إرسال التقييم الآن";
            btn.style.background = "";
            btn.style.boxShadow = "";
        }, 2000);
        return;
    }
    
    const originalText = btn.innerText;
    btn.innerHTML = 'تم الإرسال بنجاح ✔';
    btn.style.background = 'var(--nature)';
    btn.style.boxShadow = '0 0 30px var(--nature), 0 10px 0 #009955';
    btn.style.color = '#000';
    btn.style.transform = 'translateY(10px) scale(0.95)';
    
    setTimeout(() => { btn.style.transform = ''; }, 200);
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.style.color = '';
        selectedRating = 0;
        document.querySelectorAll('#main-stars i').forEach(s => s.classList.remove('active'));
        document.getElementById('user-comment').value = '';
    }, 3000);
}

const quizQuestionsBank = [
    { q: "ما هي التقنية التي تستخدم لتقليل استهلاك الطاقة في خوادم البيانات الضخمة؟", options: ["الحوسبة السحابية الخضراء", "التعدين الرقمي", "الشبكات العصبية", "الواقع الافتراضي"], answer: 0 },
    { q: "أي من مصادر الطاقة التالية يعتبر متجدداً وصديقاً للبيئة لتشغيل مدن فانتيك؟", options: ["الفحم الحجري", "الطاقة الشمسية", "الغاز الطبيعي", "النفط المكرر"], answer: 1 },
    { q: "ما هو الهدف الرئيسي من استخدام 'الشبكات الذكية' (Smart Grids)؟", options: ["زيادة سرعة الإنترنت", "مراقبة السكان", "إدارة وتوفير الطاقة بفاعلية", "تشفير البيانات"], answer: 2 },
    { q: "كيف يساهم الذكاء الاصطناعي في حماية الغابات؟", options: ["من خلال قطع الأشجار آلياً", "عن طريق طباعة أوراق صناعية", "تحليل صور الأقمار الصناعية لاكتشاف الحرائق مبكراً", "زيادة نسبة الكربون"], answer: 2 },
    { q: "ما هو المصطلح الذي يطلق على التخلص الآمن من الأجهزة الإلكترونية القديمة؟", options: ["القرصنة الخضراء", "إعادة تدوير النفايات الإلكترونية (E-waste)", "التحديث التلقائي", "مسح الذاكرة العشوائية"], answer: 1 },
    { q: "شركة بايرون تعتمد على خوارزميات ملوثة. ما هو البديل الأمثل الذي يسعى فريق أطلس لتطبيقه؟", options: ["الخوارزميات الموفرة للطاقة", "إيقاف الإنترنت تماماً", "حرق البيانات القديمة", "زيادة حرارة السيرفرات"], answer: 0 },
    { q: "ماذا يقصد بـ 'البصمة الكربونية' للتكنولوجيا؟", options: ["حبر الطابعات", "كمية الغازات الدفيئة الناتجة عن استخدام الأجهزة", "عدد البصمات على شاشة الهاتف", "نوع من أنواع الفيروسات"], answer: 1 },
    { q: "من هو الشخصية في فريق أطلس المتخصصة في تحليل بيانات النمو البيئي؟", options: ["زيد", "عمر", "كرم", "زيدان"], answer: 2 },
    { q: "لتقليل استهلاك البطارية في الأجهزة المحمولة، أي شاشة تعتبر الأفضل؟", options: ["شاشات البلازما القديمة", "شاشات OLED بالألوان الداكنة", "شاشات CRT", "شاشات الكوارتز"], answer: 1 },
    { q: "ما هي تقنية التشفير التي يعتمد عليها 'عمر' لحماية البيانات من شركة بايرون؟", options: ["التشفير الميكانيكي", "تشفير مفتوح المصدر (End-to-End)", "التشفير الورقي", "الترجمة الحرفية"], answer: 1 },
    { q: "كيف تساعد إنترنت الأشياء (IoT) في الزراعة الحديثة؟", options: ["من خلال الري الذكي المستند إلى رطوبة التربة", "تشغيل الموسيقى للنباتات", "تغيير لون الأوراق", "إضاءة الحقول بالنيون"], answer: 0 },
    { q: "أي من الغازات التالية يعتبر المسبب الرئيسي للاحتباس الحراري الذي تحاربه اللعبة؟", options: ["الأكسجين", "النيتروجين", "ثاني أكسيد الكربون", "الهيليوم"], answer: 2 },
    { q: "ما هو اسم الفيروس الذي أطلقته شركة بايرون للسيطرة على النظام؟", options: ["حصان طروادة", "ديدان الشبكة", "فيروس بايرون الخبيث", "برمجيات الفدية"], answer: 2 },
    { q: "من هو المبتكر الأول لنموذج (LATS)؟", options: ["زيد", "كرم", "زيدان", "عمر"], answer: 2 },
    { q: "ما هي الميزة الأساسية للاعتماد على 'البيانات الضخمة' (Big Data) في حل الأزمات البيئية؟", options: ["أخذ مساحة تخزين كبيرة", "إبطاء الحواسيب", "التنبؤ الدقيق بالتغيرات المناخية واتخاذ قرارات مبكرة", "صنع ألعاب إلكترونية"], answer: 2 }
];

let currentQuestions = [];
let currentQIndex = 0;
let mistakes = 0;
const maxMistakes = 3;

function openQuizInfo() {
    openMuseumModal('', 'معلومات عن المسابقة', 'مرحباً بك في مسابقة أطلس! ستواجه 10 أسئلة تدمج بين التكنولوجيا والبيئة. كل إجابة صحيحة تقربك من تحرير فانتيك. احذر، لديك 3 محاولات خاطئة فقط قبل إغلاق النظام. حظاً موفقاً!');
}

function switchQuizView(viewId) {
    document.querySelectorAll('.quiz-view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(viewId).classList.add('active-view');
}

function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startQuizCountdown() {
    switchQuizView('quiz-countdown-screen');
    let count = 5;
    const countEl = document.getElementById('countdown-text');
    countEl.innerText = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countEl.innerText = count;
            countEl.style.animation = 'none';
            void countEl.offsetWidth;
            countEl.style.animation = 'pulseCount 1s infinite';
        } else {
            clearInterval(interval);
            startActiveQuiz();
        }
    }, 1000);
}

function startActiveQuiz() {
    currentQuestions = shuffleArray(quizQuestionsBank).slice(0, 10);
    currentQIndex = 0;
    mistakes = 0;
    updateLivesUI();
    switchQuizView('quiz-active-screen');
    loadQuestion();
}

function updateLivesUI() {
    const livesDiv = document.getElementById('quiz-lives');
    livesDiv.innerHTML = '';
    for(let i=0; i<maxMistakes; i++) {
        if(i < (maxMistakes - mistakes)) {
            livesDiv.innerHTML += '<i class="fas fa-heart"></i>';
        } else {
            livesDiv.innerHTML += '<i class="fas fa-heart-broken lost"></i>';
        }
    }
}

function loadQuestion() {
    const qData = currentQuestions[currentQIndex];
    document.getElementById('current-q-num').innerText = currentQIndex + 1;
    document.getElementById('question-text').innerText = qData.q;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    let ops = qData.options.map((opt, index) => ({text: opt, isCorrect: index === qData.answer}));
    ops = shuffleArray(ops);
    
    ops.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => checkAnswer(btn, opt.isCorrect);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(btnElement, isCorrect) {
    document.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        setTimeout(() => {
            currentQIndex++;
            if(currentQIndex < currentQuestions.length) {
                loadQuestion();
            } else {
                showResult(true);
            }
        }, 1500);
    } else {
        btnElement.classList.add('wrong');
        mistakes++;
        updateLivesUI();
        
        document.querySelectorAll('.quiz-option-btn').forEach(b => {
            const currentQ = currentQuestions[currentQIndex];
            if(b.innerText === currentQ.options[currentQ.answer]) {
                setTimeout(() => b.classList.add('correct'), 500);
            }
        });
        
        setTimeout(() => {
            if(mistakes >= maxMistakes) {
                showResult(false);
            } else {
                currentQIndex++;
                if(currentQIndex < currentQuestions.length) loadQuestion();
                else showResult(true);
            }
        }, 2000);
    }
}

function showResult(isWin) {
    switchQuizView('quiz-result-screen');
    const title = document.getElementById('result-title');
    const msg = document.getElementById('result-msg');
    
    if(isWin) {
        title.innerText = "أداء استثنائي!";
        title.style.color = "var(--nature)";
        msg.innerText = "لقد أجبت على الأسئلة بنجاح وأنقذت بيانات فانتيك.";
    } else {
        title.innerText = "حظ أوفر!";
        title.style.color = "#ff004c";
        msg.innerText = "لقد استنفدت جميع محاولاتك واخترق بايرون النظام.";
    }
}

function resetQuiz() {
    startActiveQuiz();
}

function exitQuiz() {
    switchQuizView('quiz-start-screen');
}

let downloadTimer;
let countdownValue = 5;
let isDownloading = false;

function startDownloadProcess() {
    if(isDownloading) return;
    
    isDownloading = true;
    countdownValue = 5;
    
    const btn = document.getElementById('main-download-btn');
    const btnText = document.getElementById('download-btn-text');
    const cancelBtn = document.getElementById('cancel-download-btn');
    const progressBar = document.getElementById('download-progress-bar');
    
    cancelBtn.style.display = 'flex';
    btn.style.transform = 'translateZ(20px) scale(1.05)';
    btn.style.boxShadow = '0 0 40px var(--nature)';
    btnText.innerHTML = '<i class="fas fa-satellite-dish fa-spin"></i> جاري معالجة البيانات...';
    progressBar.style.width = '0%';
    
    setTimeout(() => {
        if(!isDownloading) return;
        downloadStep();
    }, 1500);
}

function downloadStep() {
    const btnText = document.getElementById('download-btn-text');
    const progressBar = document.getElementById('download-progress-bar');
    
    if(countdownValue > 0) {
        btnText.innerHTML = `<i class="fas fa-hourglass-half"></i> يبدأ التحميل خلال ${countdownValue}...`;
        progressBar.style.width = `${(5 - countdownValue + 1) * 20}%`;
        countdownValue--;
        downloadTimer = setTimeout(downloadStep, 1000);
    } else {
        finishDownload();
    }
}

function finishDownload() {
    isDownloading = false;
    const btnText = document.getElementById('download-btn-text');
    const cancelBtn = document.getElementById('cancel-download-btn');
    const btn = document.getElementById('main-download-btn');
    
    btnText.innerHTML = '<i class="fas fa-check-circle"></i> جاري تنزيل اللعبة!';
    cancelBtn.style.display = 'none';
    btn.style.background = 'var(--nature)';
    
    const link = document.createElement('a');
    link.href = 'atlas-game-v1.apk';
    link.download = 'atlas-game-v1.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(resetDownloadBtn, 4000);
}

function cancelDownload() {
    clearTimeout(downloadTimer);
    isDownloading = false;
    
    const btn = document.getElementById('main-download-btn');
    const btnText = document.getElementById('download-btn-text');
    const cancelBtn = document.getElementById('cancel-download-btn');
    const progressBar = document.getElementById('download-progress-bar');
    
    btn.style.background = '#ff004c';
    btn.style.boxShadow = '0 0 40px #ff004c';
    btnText.innerHTML = '<i class="fas fa-ban"></i> تم الإلغاء';
    progressBar.style.width = '0%';
    cancelBtn.style.display = 'none';
    
    setTimeout(resetDownloadBtn, 3000);
}

function resetDownloadBtn() {
    isDownloading = false;
    const btn = document.getElementById('main-download-btn');
    btn.style.background = '';
    btn.style.transform = '';
    btn.style.boxShadow = '';
    document.getElementById('download-btn-text').innerHTML = '<i class="fas fa-download"></i> تحميل اللعبة';
    document.getElementById('download-progress-bar').style.width = '0%';
    document.getElementById('cancel-download-btn').style.display = 'none';
}








// ==========================================
// 11. المحرك العميق للترجمة الذكية واعتراض الوظائف (Smart Override Engine V3)
// ==========================================

let currentLang = 'ar';
let isByronTheme = false;

// 1. أسئلة المسابقة باللغة الإنجليزية
const quizQuestions_EN = [
    { q: "What technology reduces energy consumption in big data servers?", options: ["Green Cloud Computing", "Digital Mining", "Neural Networks", "VR"], answer: 0 },
    { q: "Which is a renewable energy source to power Vantic?", options: ["Coal", "Solar Energy", "Natural Gas", "Refined Oil"], answer: 1 },
    { q: "What is the main goal of 'Smart Grids'?", options: ["Increase internet speed", "Monitor population", "Manage energy effectively", "Encrypt data"], answer: 2 },
    { q: "How does AI help protect forests?", options: ["Automated logging", "Printing artificial leaves", "Analyzing satellite images for fires", "Increasing carbon"], answer: 2 },
    { q: "What is the safe disposal of old electronics called?", options: ["Green Hacking", "E-waste Recycling", "Auto Update", "Clearing RAM"], answer: 1 },
    { q: "What is the optimal alternative to Byron's polluting algorithms?", options: ["Energy-saving algorithms", "Shutting down the internet", "Burning old data", "Heating servers"], answer: 0 },
    { q: "What is the technology's 'Carbon Footprint'?", options: ["Printer ink", "Greenhouse gases from devices", "Fingerprints on phone screens", "Type of virus"], answer: 1 },
    { q: "Who in the Atlas team analyzes environmental growth data?", options: ["Zaid", "Omar", "Karam", "Zaidan"], answer: 2 },
    { q: "To reduce mobile battery consumption, which screen is best?", options: ["Old Plasma", "Dark colored OLED", "CRT", "Quartz"], answer: 1 },
    { q: "What encryption does 'Omar' rely on against Byron?", options: ["Mechanical encryption", "End-to-End encryption", "Paper encryption", "Literal translation"], answer: 1 },
    { q: "How does IoT help in modern agriculture?", options: ["Smart irrigation based on soil moisture", "Playing music for plants", "Changing leaf colors", "Neon field lighting"], answer: 0 },
    { q: "Which gas is the main cause of global warming in the game?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: 2 },
    { q: "What virus did Byron launch to control the system?", options: ["Trojan Horse", "Network Worms", "Byron Malicious Virus", "Ransomware"], answer: 2 },
    { q: "Who is the original creator of the (LATS) model?", options: ["Zaid", "Karam", "Zaidan", "Omar"], answer: 2 },
    { q: "What is the main advantage of 'Big Data' in environmental crises?", options: ["Takes huge storage", "Slows down computers", "Accurate prediction of climate changes", "Making electronic games"], answer: 2 }
];

// 2. المحلل الذكي للنصوص الديناميكية (يحلل جزءاً من النص ليترجمه بالكامل)
function getTranslatedText(text) {
    if (!text) return text;
    
    // الأسماء
    if (text.includes('كرم السعودي')) return 'Karam Al-Saudi';
    if (text.includes('زيد كنعان')) return 'Zaid Kanaan';
    if (text.includes('محمد زيدان')) return 'Mohammad Zaidan';
    if (text.includes('عمر هشلمون')) return 'Omar Hashlamoun';
    if (text === 'كرم') return 'Karam';
    if (text === 'زيد') return 'Zaid';
    if (text === 'عمر') return 'Omar';
    if (text === 'زيدان') return 'Zaidan';
    if (text.includes('بايرون')) return 'Boss Byron';
    if (text === 'القوة') return 'Power';
    if (text === 'المرونة') return 'Flexibility';
    if (text === 'السرعة') return 'Speed';
    if (text === 'الاختفاء') return 'Stealth';

    // شروحات المتحف (باستخدام كلمات مفتاحية ذكية لتجاهل المسافات والنقاط)
    if (text.includes('النمو الطبيعي')) return 'Environmental expert responsible for natural growth data. Measures pollution and treats global warming using botanical abilities.';
    if (text.includes('وتدريب الروبوتات')) return 'The AI expert of the team. His main role is analyzing algorithms, fixing software bugs, and training robots.';
    if (text.includes('والأمن السيبراني')) return 'Network and cybersecurity expert. Specializes in detecting breaches and protecting big data from viruses.';
    if (text.includes('المؤسس والمرشد')) return 'The founder and guide. The digital version of the LATS model creator, guiding heroes in the Vantic world.';
    if (text.includes('السوق العالمي')) return 'Founder of the mysterious Byron Corp. Seeks to control the global market and hide the environmental pollution.';
    if (text.includes('الدروع الرقمية')) return 'An offensive ability used to smash high digital shields.';
    if (text.includes('تجاوز العوائق')) return 'Allows the character to bypass environmental obstacles smoothly and quickly.';
    if (text.includes('سرعة معالجة')) return 'Increases data processing speed and movement between servers.';
    if (text.includes('تشفير الهوية')) return 'Temporarily encrypts identity to avoid detection by Byron systems.';

    // شروحات الهوية الشخصية
    if (text.includes('خبير نمو بيئي')) return 'Environmental Growth Expert. Responsible for maintaining natural balance and solving global warming issues using advanced green technologies.';
    if (text.includes('الخوارزميات المعقدة')) return 'AI Expert. Analyzes complex algorithms and cleans massive data to ensure the LATS system operates at peak efficiency.';
    if (text.includes('الصلاحيات العليا')) return 'Founder & Mastermind. Owner of the original LATS model, holding supreme authority to control digital system pathways.';
    if (text.includes('الجندي المجهول')) return 'Network Expert. The unsung hero protecting the system from cyber breaches launched by the hostile Byron Corporation.';

    return text; // في حال لم يتطابق، يعيد النص الأصلي
}

// 3. اعتراض النوافذ المنبثقة لترجمتها بالذكاء
const originalOpenMuseumModal = window.openMuseumModal;
window.openMuseumModal = function(imgSrc, name, desc) {
    let finalName = currentLang === 'en' ? getTranslatedText(name) : name;
    let finalDesc = currentLang === 'en' ? getTranslatedText(desc) : desc;
    if(originalOpenMuseumModal) originalOpenMuseumModal(imgSrc, finalName, finalDesc);
};

const originalOpenIdModal = window.openIdModal;
window.openIdModal = function(name, desc, imgSrc) {
    let finalName = currentLang === 'en' ? getTranslatedText(name) : name;
    let finalDesc = currentLang === 'en' ? getTranslatedText(desc) : desc;
    if(originalOpenIdModal) originalOpenIdModal(finalName, finalDesc, imgSrc);
};

// 4. باقي وظائف اللعبة المعترضة (المسابقة، التقييم، التحميل)
window.processFeedback = function() {
    const btn = document.getElementById('submit-btn');
    if (selectedRating === 0) {
        btn.innerText = currentLang === 'en' ? "Choose a rating first ⚠️" : "اختر تقييماً أولاً ⚠️";
        btn.style.background = "#ff004c"; btn.style.boxShadow = "0 0 20px #ff004c";
        setTimeout(() => { btn.innerText = currentLang === 'en' ? "Submit Feedback Now" : "إرسال التقييم الآن"; btn.style.background = ""; btn.style.boxShadow = ""; }, 2000);
        return;
    }
    btn.innerHTML = currentLang === 'en' ? 'Sent Successfully ✔' : 'تم الإرسال بنجاح ✔';
    btn.style.background = 'var(--nature)'; btn.style.boxShadow = '0 0 30px var(--nature), 0 10px 0 #009955';
    btn.style.color = '#000'; btn.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => { btn.style.transform = ''; }, 200);
    setTimeout(() => {
        btn.innerText = currentLang === 'en' ? "Submit Feedback Now" : "إرسال التقييم الآن";
        btn.style.background = ''; btn.style.boxShadow = ''; btn.style.color = '';
        selectedRating = 0; document.querySelectorAll('#main-stars i').forEach(s => s.classList.remove('active'));
        document.getElementById('user-comment').value = '';
    }, 3000);
};

window.startDownloadProcess = function() {
    if(isDownloading) return;
    isDownloading = true; countdownValue = 5;
    const btn = document.getElementById('main-download-btn'); const btnText = document.getElementById('download-btn-text'); const cancelBtn = document.getElementById('cancel-download-btn'); const progressBar = document.getElementById('download-progress-bar');
    cancelBtn.style.display = 'flex'; btn.style.transform = 'translateZ(20px) scale(1.05)'; btn.style.boxShadow = '0 0 40px var(--nature)';
    btnText.innerHTML = currentLang === 'en' ? '<i class="fas fa-satellite-dish fa-spin"></i> Processing Data...' : '<i class="fas fa-satellite-dish fa-spin"></i> جاري معالجة البيانات...';
    progressBar.style.width = '0%'; setTimeout(() => { if(!isDownloading) return; downloadStep(); }, 1500);
};
window.downloadStep = function() {
    const btnText = document.getElementById('download-btn-text'); const progressBar = document.getElementById('download-progress-bar');
    if(countdownValue > 0) {
        btnText.innerHTML = currentLang === 'en' ? `<i class="fas fa-hourglass-half"></i> Download starts in ${countdownValue}...` : `<i class="fas fa-hourglass-half"></i> يبدأ التحميل خلال ${countdownValue}...`;
        progressBar.style.width = `${(5 - countdownValue + 1) * 20}%`;
        countdownValue--; downloadTimer = setTimeout(window.downloadStep, 1000);
    } else { finishDownload(); }
};
window.finishDownload = function() {
    isDownloading = false; const btnText = document.getElementById('download-btn-text'); const cancelBtn = document.getElementById('cancel-download-btn'); const btn = document.getElementById('main-download-btn');
    btnText.innerHTML = currentLang === 'en' ? '<i class="fas fa-check-circle"></i> Downloading Game!' : '<i class="fas fa-check-circle"></i> جاري تنزيل اللعبة!';
    cancelBtn.style.display = 'none'; btn.style.background = 'var(--nature)';
    const link = document.createElement('a'); link.href = 'atlas-game-v1.apk'; link.download = 'atlas-game-v1.apk';
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(resetDownloadBtn, 4000);
};
window.cancelDownload = function() {
    clearTimeout(downloadTimer); isDownloading = false; const btnText = document.getElementById('download-btn-text'); const cancelBtn = document.getElementById('cancel-download-btn'); const btn = document.getElementById('main-download-btn'); const progressBar = document.getElementById('download-progress-bar');
    btn.style.background = '#ff004c'; btn.style.boxShadow = '0 0 40px #ff004c';
    btnText.innerHTML = currentLang === 'en' ? '<i class="fas fa-ban"></i> Cancelled' : '<i class="fas fa-ban"></i> تم الإلغاء';
    progressBar.style.width = '0%'; cancelBtn.style.display = 'none'; setTimeout(resetDownloadBtn, 3000);
};
window.resetDownloadBtn = function() {
    isDownloading = false; const btn = document.getElementById('main-download-btn');
    btn.style.background = ''; btn.style.transform = ''; btn.style.boxShadow = '';
    document.getElementById('download-btn-text').innerHTML = currentLang === 'en' ? '<i class="fas fa-download"></i> Download Game' : '<i class="fas fa-download"></i> تحميل اللعبة';
    document.getElementById('download-progress-bar').style.width = '0%'; document.getElementById('cancel-download-btn').style.display = 'none';
};

window.startActiveQuiz = function() {
    let activeBank = currentLang === 'en' ? quizQuestions_EN : quizQuestionsBank;
    currentQuestions = shuffleArray(activeBank).slice(0, 10);
    currentQIndex = 0; mistakes = 0; updateLivesUI(); switchQuizView('quiz-active-screen'); loadQuestion();
};
const originalLoadQuestion = window.loadQuestion;
window.loadQuestion = function() {
    originalLoadQuestion();
    const progressEl = document.querySelector('.quiz-progress');
    if (progressEl) progressEl.innerHTML = currentLang === 'en' ? `Question <span id="current-q-num">${currentQIndex + 1}</span> of 10` : `سؤال <span id="current-q-num">${currentQIndex + 1}</span> من 10`;
    const qText = document.getElementById('question-text');
    const options = document.querySelectorAll('.quiz-option-btn');
    if (currentLang === 'en') {
        if(qText) qText.style.direction = 'ltr'; options.forEach(btn => btn.style.direction = 'ltr');
    } else {
        if(qText) qText.style.direction = 'rtl'; options.forEach(btn => btn.style.direction = 'rtl');
    }
};
window.showResult = function(isWin) {
    switchQuizView('quiz-result-screen');
    const title = document.getElementById('result-title'); const msg = document.getElementById('result-msg');
    if(isWin) {
        title.innerText = currentLang === 'en' ? "Exceptional Performance!" : "أداء استثنائي!"; title.style.color = "var(--nature)";
        msg.innerText = currentLang === 'en' ? "You successfully answered and saved Vantic data." : "لقد أجبت على الأسئلة بنجاح وأنقذت بيانات فانتيك.";
    } else {
        title.innerText = currentLang === 'en' ? "Better Luck Next Time!" : "حظ أوفر!"; title.style.color = "#ff004c";
        msg.innerText = currentLang === 'en' ? "You exhausted all attempts and Byron hacked the system." : "لقد استنفدت جميع محاولاتك واخترق بايرون النظام.";
    }
};

// 5. زر تغيير اللغة وترجمة الموقع الرئيسي
function toggleLanguage() {
    const langIcon = document.getElementById('lang-icon');
    const langText = document.getElementById('lang-text');
    gsap.to(langIcon, { rotationY: '+=360', duration: 0.6 });

    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    langText.innerText = currentLang === 'ar' ? 'EN' : 'AR';

const navLangs = {
    'ar': { 
        home: "الرئيسية", about: "التعريف", identity: "الهوية", museum: "المتحف", 
        feedback: "التقييم", quiz: "المسابقة", download: "التحميل" 
    },
    'en': { 
        home: "Home", about: "About", identity: "Identity", museum: "Museum", 
        feedback: "Feedback", quiz: "Quiz", download: "Download" 
    }
};
    if (typeof navTranslations !== 'undefined') {
         Object.assign(navTranslations, navLangs[currentLang]);
         const activeSection = document.querySelector('.page-section.active');
         if(activeSection && typeof renderNav === 'function') renderNav(activeSection.id);
    }

    const setHtml = (selector, ar, en) => { document.querySelectorAll(selector).forEach(el => el.innerHTML = currentLang === 'en' ? en : ar); };
    
    setHtml('#intro-step-1 .intro-title', 'مرحباً بك في موقع <span class="highlight-text">أطلس</span>', 'Welcome to <span class="highlight-text">ATLAS</span>');
    setHtml('#intro-step-1 .intro-subtitle', 'عالم تندمج فيه التكنولوجيا المعقدة مع سحر الطبيعة الخلابة.<br>استعد لإنقاذ "فانتيك 2050" من الدمار الرقمي.', 'A world where complex tech merges with nature.<br>Prepare to save "Vantic 2050".');
    setHtml('#intro-step-1 .epic-btn', '<span class="btn-text">الخطوة التالية</span><i class="fas fa-arrow-left btn-icon-left"></i>', '<span class="btn-text">Next Step</span><i class="fas fa-arrow-right btn-icon-left"></i>');
    setHtml('#intro-step-2 .intro-title', 'بوابتك نحو المستقبل', 'Gateway to the Future');
    setHtml('#intro-step-2 .intro-subtitle', 'موقع أطلس هو بوابتك الرسمية. هنا يمكنك التعرف على أبطال اللعبة،<br> واستكشاف المطورين، واختبار معلوماتك.', 'ATLAS is your official portal. Meet heroes, explore developers,<br> and test your knowledge.');
    setHtml('#intro-step-2 .epic-btn', '<span class="btn-text">دخول الموقع</span><i class="fas fa-sign-in-alt btn-icon-left"></i>', '<span class="btn-text">Enter Site</span><i class="fas fa-sign-in-alt btn-icon-left"></i>');
    
    setHtml('.game-title', 'أطلس GAME', 'ATLAS GAME');
    document.querySelectorAll('.game-title').forEach(el => { if(el.dataset.text) el.dataset.text = currentLang === 'en' ? 'ATLAS GAME' : 'أطلس GAME'; });
    setHtml('.welcome-msg', 'مرحباً بكم في عالم فانتيك 2050', 'Welcome to Vantic 2050');
    setHtml('#wrap-1 h3', 'نبذة عن اللعبة', 'About The Game'); setHtml('#wrap-1 p', 'اضغط لاستكشاف القصة', 'Click to explore the story'); setHtml('#drop1 .inner-text', 'أطلس هي تجربة فريدة تجمع بين حماية الطبيعة والذكاء الاصطناعي لإنقاذ فانتيك 2050.', 'Atlas is a unique experience combining nature protection and AI to save Vantic 2050.');
    setHtml('#wrap-2 h3', 'بداية المغامرة', 'Adventure Begins'); setHtml('#wrap-2 p', 'تعرف على فريقك ومهمتك', 'Meet your team and mission'); setHtml('#drop2 .inner-text', 'تبدأ المهمة من الضواحي المهجورة، حيث تجتمع مع فريقك لحل الألغاز وتطهير السيرفرات.', 'The mission starts in the abandoned suburbs, joining your team to solve puzzles and clear servers.');
    setHtml('.accordion-btn', '<i class="fas fa-info-circle"></i> شرح اللعبة', '<i class="fas fa-info-circle"></i> Game Info'); setHtml('.long-desc', 'تعتمد "أطلس" على نظام القتال التقني المبتكر. يقوم اللاعب بتبديل الأدوار لحل الألغاز البيئية.', 'ATLAS relies on an innovative combat system. Switch roles to solve puzzles.');

    setHtml('#identity h2', 'الهوية الشخصية للفريق', 'Team Personnel Files');
    setHtml('.id-info p', 'عرض الهوية <i class="fas fa-id-badge"></i>', 'View Identity <i class="fas fa-id-badge"></i>');
    setHtml('.social-trigger-btn', '<i class="fas fa-link"></i> قنوات التواصل', '<i class="fas fa-link"></i> Social Channels');
    setHtml('.social-modal-title', 'تواصل مباشر <i class="fas fa-satellite-dish"></i>', 'Direct Contact <i class="fas fa-satellite-dish"></i>');
    
    const ids = document.querySelectorAll('.id-info h3');
    if(ids.length >= 4) {
        ids[0].innerHTML = currentLang === 'en' ? 'Karam Al-Saudi' : 'كرم السعودي'; ids[1].innerHTML = currentLang === 'en' ? 'Zaid Kanaan' : 'زيد كنعان';
        ids[2].innerHTML = currentLang === 'en' ? 'Mohammad Zaidan' : 'محمد زيدان'; ids[3].innerHTML = currentLang === 'en' ? 'Omar Hashlamoun' : 'عمر هشلمون';
    }

    const mus = document.querySelectorAll('.museum-item span');
    if(mus.length >= 9) {
        const musEn = ['Karam', 'Zaid', 'Omar', 'Zaidan', 'Power', 'Flexibility', 'Speed', 'Stealth', 'Boss Byron'];
        const musAr = ['كرم', 'زيد', 'عمر', 'زيدان', 'القوة', 'المرونة', 'السرعة', 'الاختفاء', 'الزعيم بايرون'];
        mus.forEach((el, i) => el.innerHTML = currentLang === 'en' ? musEn[i] : musAr[i]);
    }

    setHtml('#feedback h2', 'أرسل تقييمك', 'Send Feedback'); setHtml('#feedback p', 'نحن نهتم برأيك لتطوير عالم أطلس', 'We care about your opinion to develop Atlas world');
    setHtml('.stars-wrapper span', 'قيم تجربتك:', 'Rate your experience:'); setHtml('#submit-btn', 'إرسال التقييم الآن', 'Submit Feedback Now');
    const commentBox = document.getElementById('user-comment');
    if(commentBox) commentBox.placeholder = currentLang === 'en' ? 'Write your feedback here to evolve together...' : 'اكتب ملاحظاتك هنا لنتطور معاً...';
    
    setHtml('.ticker-text', 'كرم السعودي . زيد كنعان . محمد زيدان . عمر هشلمون', 'Karam Al-Saudi . Zaid Kanaan . Mohammad Zaidan . Omar Hashlamoun');
    setHtml('.copyright', 'جميع الحقوق محفوظة © فريق أطلس 2026', 'All Rights Reserved © Atlas Team 2026');
    if(!isDownloading) setHtml('#download-btn-text', '<i class="fas fa-download"></i> تحميل اللعبة', '<i class="fas fa-download"></i> Download Game');

    setHtml('#quiz-start-screen h2', 'اختبر معلوماتك', 'Test Your Knowledge');
    const quizH3 = document.querySelectorAll('#quiz-start-screen h3');
    if(quizH3.length >= 2) {
        quizH3[0].innerHTML = currentLang === 'en' ? 'Start Quiz' : 'ابدأ المسابقة'; quizH3[1].innerHTML = currentLang === 'en' ? 'Quiz Information' : 'معلومات عن المسابقة';
    }
    const quizEndH3 = document.querySelectorAll('#quiz-result-screen h3');
    if(quizEndH3.length >= 2) {
        quizEndH3[0].innerHTML = currentLang === 'en' ? 'Restart Quiz' : 'إعادة المسابقة'; quizEndH3[1].innerHTML = currentLang === 'en' ? 'Exit Quiz' : 'الخروج من المسابقة';
    }

    const playBtn = document.getElementById('play-pause-btn'); if(playBtn) playBtn.title = currentLang === 'en' ? 'Play / Pause' : 'تشغيل / إيقاف';
    const muteBtn = document.getElementById('mute-btn'); if(muteBtn) muteBtn.title = currentLang === 'en' ? 'Mute / Unmute' : 'كتم / تشغيل الصوت';
    const speedBtn = document.getElementById('speed-btn'); if(speedBtn) speedBtn.title = currentLang === 'en' ? 'Playback Speed' : 'سرعة التشغيل';
    const fullBtn = document.getElementById('fullscreen-btn'); if(fullBtn) fullBtn.title = currentLang === 'en' ? 'Fullscreen' : 'ملء الشاشة';
    const dlBtn = document.querySelector('a.ctrl-btn'); if(dlBtn) dlBtn.title = currentLang === 'en' ? 'Download Video' : 'تحميل الفيديو';

    if (document.getElementById('quiz-active-screen') && document.getElementById('quiz-active-screen').classList.contains('active-view')) {
        let activeBank = currentLang === 'en' ? quizQuestions_EN : quizQuestionsBank; currentQuestions = activeBank; loadQuestion();
    }
    gsap.from(".page-section.active, .site-header, .main-footer", { opacity: 0.5, duration: 0.5 });
}

function toggleCyberNatureTheme() {
    const themeIcon = document.getElementById('theme-icon'); const btn = document.getElementById('theme-toggle-btn');
    gsap.to(btn, { rotationZ: '+=360', scale: 1.2, duration: 0.5, yoyo: true, repeat: 1 });
    const flash = document.createElement('div'); flash.style.cssText = "position:fixed; inset:0; background:#fff; z-index:999999; pointer-events:none; opacity:0; mix-blend-mode: overlay;";
    document.body.appendChild(flash);
    gsap.to(flash, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => {
        isByronTheme = !isByronTheme;
        if (isByronTheme) {
            document.body.classList.add('byron-theme'); themeIcon.className = 'fas fa-cog fa-spin'; themeIcon.style.color = '#ff004c';
        } else {
            document.body.classList.remove('byron-theme'); themeIcon.className = 'fas fa-leaf'; themeIcon.style.color = '';
        }
        flash.remove();
    }});
}

document.addEventListener('mousemove', (e) => {
    const caps = document.getElementById('floating-3d-settings');
    if(caps) { const xPos = (window.innerWidth / 2 - e.pageX) / 60; const yPos = (window.innerHeight / 2 - e.pageY) / 60; gsap.to(caps, { rotationY: 15 + xPos, rotationX: -yPos, ease: "power1.out" }); }
});











// ==========================================
// محرك الانتقال الميكانيكي (V6 - إصلاح الاهتزاز وحواف الشاشة)
// ==========================================

const mechanicalWipeSound = new Audio('https://actions.google.com/sounds/v1/science_fiction/space_door_open.ogg');
let isWiping = false; 

// 1. دالة فتح الأبواب
window.openCyberDoors = function() {
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');
    const logo = document.querySelector('.door-center-logo');
    const container = document.getElementById('cyber-doors-container');

    if (!leftDoor || !rightDoor) return;

    mechanicalWipeSound.currentTime = 0;
    mechanicalWipeSound.volume = 1.0;
    mechanicalWipeSound.play().catch(()=>{});

    // إعادة الحجم الطبيعي وإلغاء الاهتزاز بسلاسة عند الفتح
    gsap.to(container, { scale: 1, duration: 0.2 }); 
    gsap.to(logo, { scale: 0, opacity: 0, duration: 0.2 });
    
    gsap.to(leftDoor, { left: '-60%', duration: 0.8, ease: "power4.out" });
    gsap.to(rightDoor, { right: '-60%', duration: 0.8, ease: "power4.out", onComplete: () => {
        container.style.pointerEvents = 'none'; 
        isWiping = false; 
    }});
};

// 2. دالة إغلاق الأبواب (مع إصلاح الحواف)
window.triggerMechanicalWipe = function(callback) {
    const leftDoor = document.querySelector('.left-door');
    const rightDoor = document.querySelector('.right-door');
    const logo = document.querySelector('.door-center-logo');
    const container = document.getElementById('cyber-doors-container');

    if (!leftDoor || !rightDoor || isWiping) return; 
    isWiping = true;

    container.style.pointerEvents = 'all';
    
    // التأكد من أن الحاوية في مكانها الطبيعي قبل البدء
    gsap.set(container, { scale: 1, x: 0 });

    // إغلاق خاطف (0.2 ثانية)
    gsap.to(leftDoor, { left: '0%', duration: 0.2, ease: "power4.in" });
    gsap.to(rightDoor, { right: '0%', duration: 0.2, ease: "power4.in", onComplete: () => {
        
        // تغيير الصفحة في الظلام التام
        if (typeof callback === 'function') callback();

        mechanicalWipeSound.currentTime = 0;
        mechanicalWipeSound.volume = 1.0;
        mechanicalWipeSound.play().catch(()=>{});
        
        // السر هنا: تكبير الحاوية 5% لتخرج الأطراف خارج الشاشة، ثم الاهتزاز براحة تامة!
        gsap.set(container, { scale: 1.05 });
        gsap.fromTo(container, {x: -15}, {x: 15, duration: 0.01, yoyo: true, repeat: 5, onComplete: () => {
            gsap.set(container, { x: 0 }); // تصفير الاهتزاز عند الانتهاء
        }});

        gsap.to(logo, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });

        // ننتظر قليلاً ثم نفتح الأبواب
        setTimeout(() => {
            window.openCyberDoors();
        }, 800); 
    }});
};

// ==========================================
// 3. فتح الأبواب التلقائي عند الدخول للموقع
// ==========================================
window.addEventListener('load', () => {
    const logo = document.querySelector('.door-center-logo');
    if(logo) gsap.set(logo, { scale: 1, opacity: 1 }); 
    
    setTimeout(() => {
        window.openCyberDoors();
    }, 500);
});

// ==========================================
// 4. الاعتراض الذكي لدالة التنقل
// ==========================================
if (typeof window.originalRenderNav_doors === 'undefined') {
    window.originalRenderNav_doors = window.renderNav;
    
    window.renderNav = function(sectionId) {
        const activeSection = document.querySelector('.page-section.active');
        if (activeSection && activeSection.id === sectionId) return;

        triggerMechanicalWipe(() => {
            if (window.originalRenderNav_doors) {
                window.originalRenderNav_doors(sectionId);
            }
        });
    };
}







