import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import VertexShader from './shaders/test/vertex.glsl'
import FragmentShader from './shaders/test/fragment.glsl'
import { gsap } from 'gsap';
import click from '../static/Audio/click.mp3';
import hover from '../static/Audio/hover.mp3';
import bg from '../static/Audio/bg.mp3';
import image_1 from '../static/textures/1.png';
import image_2 from '../static/textures/2.png';
import image_3 from '../static/textures/3.png';
import image_4 from '../static/textures/4.png';
import image_5 from '../static/textures/5.png';
import image_6 from '../static/textures/6.png';
import image_7 from '../static/textures/7.png';
import image_8 from '../static/textures/8.png';
import mute from '../static/images/no-sound.png';
import unmute from '../static/images/sound.png';

console.log(`    
You are browsing:

mmmmmm  mmmm  m      mmmmm   mmmm          mmmm   mmmm   mmmm   mmmm 
#      m"  "m #        #    m"  "m        "   "# m"  "m "   "# "   "#
#mmmmm #    # #        #    #    #            m" #  m #     m"   mmm"
#      #    # #        #    #    #  """     m"   #    #   m"       "#
#       #mm#  #mmmmm mm#mm   #mm#         m#mmmm  #mm#  m#mmmm "mmm#"         -By SK027

`);


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
scene.add(camera);

/** ===========================================================================================
 * *                                    Loading manager
=========================================================================================== */
const progressBar = document.querySelector('.loading-progress');
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        // Wait a little
        window.setTimeout(() => {
            // Update loadingBarElement
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
                    x: 2,
                    y: 2,
                    z: 2,
                }
            )
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
textureLoader.load(image_1);
textureLoader.load(image_2);
textureLoader.load(image_3);
textureLoader.load(image_4);
textureLoader.load(image_5);
textureLoader.load(image_6);
textureLoader.load(image_7);
textureLoader.load(image_8);
textureLoader.load(mute);
textureLoader.load(unmute);



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
// Geometry
let texture_num = Math.ceil(Math.random() * 8);
const geometry = new THREE.IcosahedronGeometry(1, 1);
let texture = null;
if(texture_num === 1) {
    texture = new THREE.TextureLoader().load(image_1);
} 
else if(texture_num === 2) {
    texture = new THREE.TextureLoader().load(image_2);
} 
else if(texture_num === 3) {
    texture = new THREE.TextureLoader().load(image_3);
} 
else if(texture_num === 4) {
    texture = new THREE.TextureLoader().load(image_4);
} 
else if(texture_num === 5) {
    texture = new THREE.TextureLoader().load(image_5);
} 
else if(texture_num === 6) {
    texture = new THREE.TextureLoader().load(image_6);
} 
else if(texture_num === 7) {
    texture = new THREE.TextureLoader().load(image_7);
} 
else if(texture_num === 8) {
    texture = new THREE.TextureLoader().load(image_8);
} 
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    uniforms: {
        uTexture: { value: texture },
    },
    side: THREE.DoubleSide
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

    mesh.rotation.y = elapsedTime * 0.1;
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.z = elapsedTime * 0.1;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()