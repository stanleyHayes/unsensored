// Heart burst particles + sound for like interactions

let audioCtx = null;

export const playLikeSound = () => {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Two-tone chirp like Twitter's like sound
        const now = audioCtx.currentTime;

        // First tone — bright pop
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1400, now);
        osc1.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
        gain1.gain.setValueAtTime(0.15, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.15);

        // Second tone — soft confirm
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(2200, now + 0.06);
        osc2.frequency.exponentialRampToValueAtTime(2600, now + 0.12);
        gain2.gain.setValueAtTime(0.1, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.2);
    } catch {
        // Silent fail — audio not supported
    }
};

export const playUnlikeSound = () => {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    } catch {
        // Silent fail
    }
};

// Spawn particles around an element
export const spawnHeartBurst = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const colors = ["#e53935", "#ff6090", "#ff8a80", "#f48fb1", "#ef5350", "#ff1744"];
    const shapes = ["heart", "circle", "star"];

    for (let i = 0; i < 8; i++) {
        const el = document.createElement("div");
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
        const distance = 20 + Math.random() * 30;
        const size = 4 + Math.random() * 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        el.style.cssText = `
            position: fixed;
            left: ${cx}px;
            top: ${cy}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;

        if (shape === "heart") {
            el.innerHTML = `<svg viewBox="0 0 24 24" width="${size + 4}" height="${size + 4}" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        } else if (shape === "star") {
            el.innerHTML = `<svg viewBox="0 0 24 24" width="${size + 2}" height="${size + 2}" fill="${color}"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>`;
        } else {
            el.style.borderRadius = "50%";
            el.style.backgroundColor = color;
        }

        document.body.appendChild(el);

        el.animate([
            {
                transform: `translate(-50%, -50%) scale(0)`,
                opacity: 1,
            },
            {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 15}px)) scale(1.2)`,
                opacity: 1,
                offset: 0.4,
            },
            {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.5}px), calc(-50% + ${Math.sin(angle) * distance * 1.5 + 10}px)) scale(0)`,
                opacity: 0,
            },
        ], {
            duration: 600 + Math.random() * 200,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fill: "forwards",
        }).onfinish = () => el.remove();
    }
};

// --- Bookmark sounds ---

export const playBookmarkSound = () => {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        // Soft "thunk" — triangle wave with a quick pitch drop
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(900, now);
        osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        osc1.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.18);

        // Shimmer overtone — higher, quieter
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1800, now + 0.04);
        osc2.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
        gain2.gain.setValueAtTime(0.06, now + 0.04);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.04);
        osc2.stop(now + 0.22);
    } catch {
        // Silent fail
    }
};

export const playUnbookmarkSound = () => {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
    } catch {
        // Silent fail
    }
};

// Spawn bookmark ribbon particles
export const spawnBookmarkBurst = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const colors = ["#7c4dff", "#b388ff", "#651fff", "#aa00ff", "#e040fb", "#536dfe"];

    for (let i = 0; i < 7; i++) {
        const el = document.createElement("div");
        const angle = (Math.PI * 2 * i) / 7 + (Math.random() - 0.5) * 0.4;
        const distance = 18 + Math.random() * 25;
        const size = 4 + Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const useBookmark = Math.random() > 0.5;

        el.style.cssText = `
            position: fixed;
            left: ${cx}px;
            top: ${cy}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;

        if (useBookmark) {
            el.innerHTML = `<svg viewBox="0 0 24 24" width="${size + 3}" height="${size + 3}" fill="${color}"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>`;
        } else {
            el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
            el.style.backgroundColor = color;
        }

        document.body.appendChild(el);

        el.animate([
            {
                transform: `translate(-50%, -50%) scale(0) rotate(0deg)`,
                opacity: 1,
            },
            {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 12}px)) scale(1.1) rotate(${(Math.random() - 0.5) * 120}deg)`,
                opacity: 1,
                offset: 0.4,
            },
            {
                transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.4}px), calc(-50% + ${Math.sin(angle) * distance * 1.4 + 8}px)) scale(0) rotate(${(Math.random() - 0.5) * 200}deg)`,
                opacity: 0,
            },
        ], {
            duration: 550 + Math.random() * 200,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fill: "forwards",
        }).onfinish = () => el.remove();
    }
};

// Check if a like belongs to the current user (handles both populated and unpopulated author)
export const isLikedByUser = (likes, userId) => {
    if (!likes?.length || !userId) return false;
    return likes.some((l) => {
        const authorId = typeof l.author === 'object' ? l.author?._id : l.author;
        return authorId === userId;
    });
};
