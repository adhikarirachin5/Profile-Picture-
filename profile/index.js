document.getElementById('work').addEventListener('click',()=>{
    document.getElementById('WorkExperience').scrollIntoView({
        behavior: 'smooth'});
    })

document.getElementById('about').addEventListener('click',()=>{
    document.getElementById('aboutme').scrollIntoView({
        behavior:'smooth'
    })
})
document.getElementById('contact').addEventListener('click',()=>{
    document.getElementById('Email').scrollIntoView({
        behavior: 'smooth'});
    })

document.getElementById('hireme').addEventListener('click',()=>{
    document.getElementById('Email').scrollIntoView({
        behavior:'smooth'
    })
})

document.getElementById('seemywork').addEventListener('click',()=>{
    document.getElementById('Projects').scrollIntoView({
        behavior:'smooth'
    })
})

// typing animation 

const typeEL = document.getElementById('textentre');
const text = "Hi, I AM Rachin Adhikari"
let i = 0; 

function type(){
    if(i<text.length){
        typeEL.textContent+= text[i];
        i++;
        setTimeout(type,80);
    }
}
setTimeout(type,600);
const typeAL = document.getElementById('anothertext');
const text1 = "CS Student & Web Developer"
let j = 0; 

 function type1(){
    if(j<text1.length){
        typeAL.textContent+= text1[j];
        j++;
        setTimeout(type1,80);
    }
}
setTimeout(type1,2500);

const logo   = document.getElementById('nametext');
const logoOriginal = logo.textContent;
const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let scrambleInterval = null;
 
logo.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(scrambleInterval);
    scrambleInterval = setInterval(() => {
        logo.textContent = logoOriginal.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return logoOriginal[idx];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iteration >= logoOriginal.length) clearInterval(scrambleInterval);
        iteration += 0.5;
    }, 40);
});
 
logo.addEventListener('mouseleave', () => {
    clearInterval(scrambleInterval);
    logo.textContent = logoOriginal;
});
 
 
// ═══════════════════════════════════════════
//  MAGNETIC BUTTONS
// ═══════════════════════════════════════════
const magnetBtns = ['hireme', 'cv', 'seemywork'];
 
magnetBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
 
    btn.addEventListener('mousemove', (e) => {
        const rect   = btn.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) * 0.3;
        const dy     = (e.clientY - cy) * 0.3;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
 
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s ease';
    });
 
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease';
    });
});
 
 
// ═══════════════════════════════════════════
//  STAGGERED FADE-IN (scroll)
// ═══════════════════════════════════════════
const staggerItems = document.querySelectorAll(
    '#Jobtitle, #JobTitle2, #JobTitle3, #JobTitle4, #projectright, #projectleft, #projectcenter'
);
 
staggerItems.forEach((el, idx) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`;
});
 
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
 
staggerItems.forEach(el => staggerObserver.observe(el));
 
 
// ═══════════════════════════════════════════
//  SCROLL FADE-IN (sections)
// ═══════════════════════════════════════════
const fadeSections = document.querySelectorAll('.fade-section');
 
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
 
fadeSections.forEach(section => fadeObserver.observe(section));
 
 
// ═══════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════
const cursor    = document.createElement('div');
cursor.id       = 'custom-cursor';
document.body.appendChild(cursor);
 
const cursorDot = document.createElement('div');
cursorDot.id    = 'cursor-dot';
document.body.appendChild(cursorDot);
 
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
 
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
});
 
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();
 
document.querySelectorAll('button, a, h3, #nametext').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
 
 
// ═══════════════════════════════════════════
//  MOUSE-REACTIVE PARTICLES
// ═══════════════════════════════════════════
const intro  = document.getElementById('intro');
const canvas = document.createElement('canvas');
canvas.id    = 'particle-canvas';
intro.insertBefore(canvas, intro.firstChild);
 
const ctx = canvas.getContext('2d');
 
function resizeCanvas() {
    canvas.width  = intro.offsetWidth;
    canvas.height = intro.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
let mx = -9999, my = -9999;
 
intro.addEventListener('mousemove', (e) => {
    const rect = intro.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
});
 
intro.addEventListener('mouseleave', () => {
    mx = -9999;
    my = -9999;
});
 
const PARTICLE_COUNT = 90;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * 400,
    r:     Math.random() * 1.5 + 0.4,
    baseX: 0,
    baseY: 0,
    dx:    (Math.random() - 0.5) * 0.35,
    dy:    (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.45 + 0.15,
}));
 
particles.forEach(p => { p.baseX = p.x; p.baseY = p.y; });
 
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    particles.forEach(p => {
        // Mouse repulsion
        const distX = p.x - mx;
        const distY = p.y - my;
        const dist  = Math.sqrt(distX * distX + distY * distY);
        const repelRadius = 100;
 
        if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius;
            p.x += (distX / dist) * force * 3;
            p.y += (distY / dist) * force * 3;
        } else {
            // Drift back toward base position
            p.x += (p.baseX - p.x) * 0.03 + p.dx;
            p.y += (p.baseY - p.y) * 0.03 + p.dy;
        }
 
        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        p.baseX += p.dx * 0.3;
        p.baseY += p.dy * 0.3;
        if (p.baseX < 0) p.baseX = canvas.width;
        if (p.baseX > canvas.width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = canvas.height;
        if (p.baseY > canvas.height) p.baseY = 0;
 
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
    });
 
    // Connection lines
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx   = particles[a].x - particles[b].x;
            const dy   = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 110)})`;
                ctx.lineWidth   = 0.5;
                ctx.stroke();
            }
        }
    }
 
    requestAnimationFrame(drawParticles);
}
drawParticles();