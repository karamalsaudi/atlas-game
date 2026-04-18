
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