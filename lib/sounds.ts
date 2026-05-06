export function playWhooshSound(type: 'open' | 'close' | 'smoosh' = 'open') {
  // Only play if user has interacted with the page (browser autoplay policy)
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  if (type === 'open') {
    // Whoosh open: frequency sweep up with decay
    const now = audioContext.currentTime;
    const duration = 0.35;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(150, now);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + duration * 0.6);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + duration);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);

    // Add some noise for more texture
    const noiseBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * duration,
      audioContext.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioContext.createBufferSource();
    const noiseGain = audioContext.createGain();
    noiseSource.buffer = noiseBuffer;
    noiseSource.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSource.start(now);
  } else if (type === 'close') {
    // Whoosh close: frequency sweep down with quick decay
    const now = audioContext.currentTime;
    const duration = 0.25;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(500, now);
    oscillator.frequency.exponentialRampToValueAtTime(150, now + duration * 0.7);
    oscillator.frequency.exponentialRampToValueAtTime(80, now + duration);

    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } else if (type === 'smoosh') {
    // Smoosh/squish sound: low frequency impact with rapid pitch drop
    const now = audioContext.currentTime;
    const duration = 0.2;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    // Quick pitch drop from mid to very low for that compression/squish effect
    oscillator.frequency.setValueAtTime(280, now);
    oscillator.frequency.exponentialRampToValueAtTime(120, now + duration * 0.15);
    oscillator.frequency.exponentialRampToValueAtTime(60, now + duration);

    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.02, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);

    // Add compressed noise for texture
    const noiseBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * duration,
      audioContext.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      // More compressed noise for squish effect
      noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseBuffer.length);
    }

    const noiseSource = audioContext.createBufferSource();
    const noiseGain = audioContext.createGain();
    noiseSource.buffer = noiseBuffer;
    noiseSource.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noiseSource.start(now);
  }
}
