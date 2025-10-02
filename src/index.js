// MusicBarber - Main Application

class MusicBarber {
    constructor() {
        this.isPlaying = false;
        this.isRecording = false;
        this.tracks = [];
        this.audioContext = null;

        this.initializeElements();
        this.bindEvents();
        this.initializeAudio();
    }

    initializeElements() {
        this.playBtn = document.getElementById('play-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.recordBtn = document.getElementById('record-btn');
        this.newTrackBtn = document.getElementById('new-track-btn');
        this.tracksContainer = document.querySelector('.tracks-container');
    }

    bindEvents() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.recordBtn.addEventListener('click', () => this.toggleRecord());
        this.newTrackBtn.addEventListener('click', () => this.addTrack());
    }

    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context initialized');
        } catch (error) {
            console.error('Error initializing audio context:', error);
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (!this.audioContext) return;

        this.isPlaying = true;
        this.playBtn.textContent = 'Pause';
        this.playBtn.style.backgroundColor = '#ff6b35';

        // Start audio playback
        console.log('Playing audio...');

        // Resume audio context if suspended
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    pause() {
        this.isPlaying = false;
        this.playBtn.textContent = 'Play';
        this.playBtn.style.backgroundColor = '#4a9eff';

        console.log('Pausing audio...');
    }

    stop() {
        this.isPlaying = false;
        this.playBtn.textContent = 'Play';
        this.playBtn.style.backgroundColor = '#4a9eff';

        // Stop all tracks
        console.log('Stopping audio...');
    }

    toggleRecord() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        if (!this.audioContext) return;

        this.isRecording = true;
        this.recordBtn.textContent = 'Stop Recording';
        this.recordBtn.style.backgroundColor = '#ff4444';

        console.log('Recording started...');
    }

    stopRecording() {
        this.isRecording = false;
        this.recordBtn.textContent = 'Record';
        this.recordBtn.style.backgroundColor = '#4a9eff';

        console.log('Recording stopped...');
    }

    addTrack() {
        const trackNumber = this.tracks.length + 1;
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.id = `track-${trackNumber}`;

        trackElement.innerHTML = `
            <div class="track-header">
                <span class="track-name">Track ${trackNumber}</span>
                <div class="track-controls">
                    <button class="mute-btn">Mute</button>
                    <button class="solo-btn">Solo</button>
                    <input type="range" class="volume-slider" min="0" max="100" value="80">
                </div>
            </div>
            <div class="track-waveform">
                <canvas class="waveform-canvas" width="800" height="60"></canvas>
            </div>
        `;

        this.tracksContainer.appendChild(trackElement);
        this.tracks.push({
            id: trackNumber,
            element: trackElement,
            muted: false,
            solo: false,
            volume: 80
        });

        console.log(`Added track ${trackNumber}`);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MusicBarber();
    console.log('MusicBarber application initialized');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MusicBarber;
}