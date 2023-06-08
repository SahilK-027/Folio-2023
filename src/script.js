import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import VertexShader from './shaders/test/vertex.glsl'
import FragmentShader from './shaders/test/fragment.glsl'
import { gsap } from 'gsap';
import SplitType from 'split-type';


import click from '../static/Audio/click.mp3';
import hover from '../static/Audio/hover.mp3';
import bg from '../static/Audio/bg.mp3';
import imageDark from '../static/textures/6.png';
import imageLight from '../static/textures/8.png';
import logo from '../static/images/logo.png';
import pacman from '../static/images/pacman.png';
import castlebt from '../static/images/castleBattle.png';
import innovision from '../static/images/innovision.png';
import trinity from '../static/images/trinity.png';
import coattain from '../static/images/coAttainment.png';

/** ===========================================================================================
 * *                                    DOM Manipulation
=========================================================================================== */
console.log(`    
You are browsing:

mmmmmm  mmmm  m      mmmmm   mmmm          mmmm   mmmm   mmmm   mmmm 
#      m"  "m #        #    m"  "m        "   "# m"  "m "   "# "   "#
#mmmmm #    # #        #    #    #            m" #  m #     m"   mmm"
#      #    # #        #    #    #  """     m"   #    #   m"       "#
#       #mm#  #mmmmm mm#mm   #mm#         m#mmmm  #mm#  m#mmmm "mmm#"         -By SK027

`);

const mobile = window.matchMedia("(max-width: 985px)").matches;
const myText = new SplitType('.my-text');

function Ticker(elem) {
    elem.lettering();
    this.done = false;
    this.cycleCount = 5;
    this.cycleCurrent = 0;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
    this.charsCount = this.chars.length;
    this.letters = elem.find('span');
    this.letterCount = this.letters.length;
    this.letterCurrent = 0;

    this.letters.each(function () {
        var $this = $(this);
        $this.attr('data-orig', $this.text());
        $this.text('-');
    });
}

Ticker.prototype.getChar = function () {
    return this.chars[Math.floor(Math.random() * this.charsCount)];
};

Ticker.prototype.reset = function () {
    this.done = false;
    this.cycleCurrent = 0;
    this.letterCurrent = 0;
    this.letters.each(function () {
        var $this = $(this);
        $this.text($this.attr('data-orig'));
        $this.removeClass('done');
    });
    this.loop();
};

Ticker.prototype.loop = function () {
    var self = this;

    this.letters.each(function (index, elem) {
        var $elem = $(elem);
        if (index >= self.letterCurrent) {
            if ($elem.text() !== ' ') {
                $elem.text(self.getChar());
                $elem.css('opacity', Math.random());
            }
        }
    });

    if (this.cycleCurrent < this.cycleCount) {
        this.cycleCurrent++;
    } else if (this.letterCurrent < this.letterCount) {
        var currLetter = this.letters.eq(this.letterCurrent);
        this.cycleCurrent = 0;
        currLetter.text(currLetter.attr('data-orig')).css('opacity', 1).addClass('done');
        this.letterCurrent++;
    } else {
        this.done = true;
    }

    if (!this.done) {
        requestAnimationFrame(function () {
            self.loop();
        });
    }
};

let $words = $('.word');

$words.each(function () {
    var $this = $(this),
        ticker = new Ticker($this).reset();
    $this.data('ticker', ticker);
});

let time = document.getElementById('time');

setInterval(() => {
    time.innerHTML = getTime();
}, 1000)


function getTime() {
    const date = new Date();
    return date;
}


let interval

const element1 = document.getElementById('scramble-1');
const element2 = document.getElementById('scramble-2');
const element3 = document.getElementById('scramble-3');
const element4 = document.getElementById('scramble-4');
const element5 = document.getElementById('scramble-5');
const element6 = document.getElementById('scramble-6');
const element7 = document.getElementById('scramble-7');
const element8 = document.getElementById('scramble-8');
const element9 = document.getElementById('scramble-9');
const element10 = document.getElementById('scramble-10');
const elementSpan1 = document.getElementById('scrambleSpan-1');
const elementSpan2 = document.getElementById('scrambleSpan-2');
const elementSpan3 = document.getElementById('scrambleSpan-3');
const elementSpan4 = document.getElementById('scrambleSpan-4');
const elementSpan5 = document.getElementById('scrambleSpan-5');
const elementSpan6 = document.getElementById('scrambleSpan-6');
const elementSpan7 = document.getElementById('scrambleSpan-7');
const elementSpan8 = document.getElementById('scrambleSpan-8');
const elementSpan9 = document.getElementById('scrambleSpan-9');
const elementSpan10 = document.getElementById('scrambleSpan-10');

const originalText = elementSpan1.innerText

const randomInt = max => Math.floor(Math.random() * max)
const randomFromArray = array => array[randomInt(array.length)]

const scrambleText = text => {
    const chars = '*?><[]&@#)(.%$-_:/;?!'.split('')
    return text
        .split('')
        .map(x => randomInt(3) > 1 ? randomFromArray(chars) : x)
        .join('')
}

element1.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan1.innerText = scrambleText(originalText)
    , 100)
})

element1.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan1.innerText = originalText
})



element2.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan2.innerText = scrambleText(originalText)
    , 100)
})

element2.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan2.innerText = originalText
})




element3.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan3.innerText = scrambleText(originalText)
    , 100)
})

element3.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan3.innerText = originalText
})




elementSpan4.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan4.innerText = scrambleText(originalText)
    , 100)
})

element4.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan4.innerText = originalText
})



elementSpan5.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan5.innerText = scrambleText(originalText)
    , 100)
})

element5.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan5.innerText = originalText
})



elementSpan6.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan6.innerText = scrambleText(originalText)
    , 100)
})

element6.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan6.innerText = originalText
})



elementSpan7.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan7.innerText = scrambleText(originalText)
    , 100)
})

element7.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan7.innerText = originalText
})



elementSpan8.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan8.innerText = scrambleText(originalText)
    , 100)
})

element8.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan8.innerText = originalText
})



elementSpan9.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan9.innerText = scrambleText(originalText)
    , 100)
})

element9.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan9.innerText = originalText
})



elementSpan10.addEventListener('mouseover', () => {
    interval = setInterval(() =>
        elementSpan10.innerText = scrambleText(originalText)
    , 100)
})

element10.addEventListener('mouseout', () => {
    clearInterval(interval)
    elementSpan10.innerText = originalText
})


/** ===========================================================================================
 * *                                    Sizes
=========================================================================================== */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
/** ===========================================================================================
 * *                                    Canvas
=========================================================================================== */
const canvas = document.querySelector('canvas.webgl');

/** ===========================================================================================
 * *                                    Scene
=========================================================================================== */
const scene = new THREE.Scene();

/** ===========================================================================================
 * *                                    Camera
=========================================================================================== */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0.0, 0.0, 4.0);
if(mobile){
    camera.position.set(0.0, 0.0, 5.0);
}
scene.add(camera);

/** ===========================================================================================
 * *                                    Loading manager
=========================================================================================== */
const musicBarsDiv = document.querySelector('.music-bars')
const musicBars = document.querySelectorAll('.stroke');
const progressBar = document.querySelector('.loading-progress');
let SoundPlaying = false;
musicBarsDiv.addEventListener('click', () => {
    ctx.resume();
    if (!SoundPlaying) {
        for (let i = 0; i < 3; i++) {
            musicBars[i].style.animationPlayState = 'running'
        }
        background.play();
        SoundPlaying = true;
    }
    else {
        for (let i = 0; i < 3; i++) {
            musicBars[i].style.animationPlayState = 'paused';
        }
        background.pause();
        SoundPlaying = false;
    }
})
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        // Wait a little
        window.setTimeout(() => {
            // Update loadingBarElement
            document.getElementById('main-page').style.display = "flex";
            gsap.to("#loader-page",
                {
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    yPercent: -300
                }
            );
            gsap.to(
                mesh.scale,
                {
                    delay: 0.5,
                    stagger: 0.1,
                    duration: 2,
                    ease: 'power2.out',
                    x: 1.7,
                    y: 1.7,
                    z: 1.7,
                }
            );
            setTimeout(() => {
                $words.each(function () {
                    var $this = $(this),
                        ticker = new Ticker($this).reset();
                    $this.data('ticker', ticker);
                });
            }, 700)


        }, 1500);
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = (itemsLoaded / itemsTotal) * 300;
        progressBar.style.width = `${progressRatio}px`;
    }
)


/** ===========================================================================================
 * *                                    Images Loader
=========================================================================================== */
const textureLoader = new THREE.TextureLoader(loadingManager);

textureLoader.load(imageDark);
textureLoader.load(imageLight);
textureLoader.load(castlebt);
textureLoader.load(coattain);
textureLoader.load(innovision);
textureLoader.load(pacman);
textureLoader.load(trinity);
textureLoader.load(logo);


/** ===========================================================================================
 * *                                    Audio
=========================================================================================== */
// instantiate a listener
const audioListener = new THREE.AudioListener();
camera.add(audioListener);
const ctx = new (window.AudioContext)();

// instantiate audio object
const hoverSound = new THREE.Audio(audioListener);
const clickSound = new THREE.Audio(audioListener);
const background = new THREE.Audio(audioListener);
scene.add(hoverSound);
scene.add(clickSound);
scene.add(background);

// instantiate a loader
const loader = new THREE.AudioLoader(loadingManager);
loader.load(
    // resource URL
    hover,
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        hoverSound.setBuffer(audioBuffer);
        hoverSound.setVolume(0.5);
    }
);
loader.load(
    // resource URL
    click,
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        clickSound.setBuffer(audioBuffer);
        clickSound.setVolume(1);
    }
);
loader.load(
    // resource URL
    bg,
    // onLoad callback
    function (audioBuffer) {
        // set the audio object buffer to the loaded object
        background.setBuffer(audioBuffer);
        background.setLoop(true);
    }
);

/** ===========================================================================================
 * *                                    Meshes
=========================================================================================== */
let isDark = true;

const moreInfoBtnDark = document.querySelectorAll('.btn-2');
const moreInfoBtnLight = document.querySelectorAll('.btn-1');

if(isDark){
    moreInfoBtnLight.forEach((btn)=>{
        btn.style.display = "none";
    })
}

// Geometry
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    isDark = !isDark;
    material.uniforms.uTexture.value = isDark ? textureDark : textureLight;
    if(isDark){
        moreInfoBtnLight.forEach((btn)=>{
            btn.style.display = "none";
        })
        moreInfoBtnDark.forEach((btn)=>{
            btn.style.display = "flex";
        })
    }
    else{
        moreInfoBtnDark.forEach((btn)=>{
            btn.style.display = "none";
        })
        moreInfoBtnLight.forEach((btn)=>{
            btn.style.display = "flex";
        })
    }
})



const geometry = new THREE.IcosahedronGeometry(1, 1);
const textureDark = new THREE.TextureLoader().load(imageDark);
const textureLight = new THREE.TextureLoader().load(imageLight);
textureDark.wrapS = textureDark.wrapT = THREE.MirroredRepeatWrapping;
textureLight.wrapS = textureLight.wrapT = THREE.MirroredRepeatWrapping;

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    uniforms: {
        uTexture: { value: textureDark },
    },
    side: THREE.DoubleSide,
})


// Mesh
const mesh = new THREE.Mesh(geometry, material)
mesh.scale.set(0);
scene.add(mesh);


/** ===========================================================================================
 * *                                    Orbit-controls
=========================================================================================== */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false;


/** ===========================================================================================
 * *                                    Renderer
=========================================================================================== */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.y = elapsedTime * 0.07;
    mesh.rotation.x = elapsedTime * 0.07;
    mesh.rotation.z = elapsedTime * 0.07;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()