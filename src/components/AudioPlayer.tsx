'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface AudioPlayerProps {
  src: string;
  title: string;
  locale?: Locale;
}

export default function AudioPlayer({ src, title, locale = 'id' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Sync volume changes to the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };
  const [hasError, setHasError] = useState(false);

  const isIndo = locale === 'id';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state when src changes
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasError(false);
    };
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    // If metadata was already cached by browser
    if (audio.readyState >= 1) {
      setDuration(audio.duration || 0);
    }

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-covenant-900 text-white rounded-2xl p-5 shadow-lg border border-covenant-800">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-full bg-covenant-500/20 text-covenant-400">
          <Music className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wider text-covenant-300 font-semibold">
            {isIndo ? 'Pratinjau Audio' : 'Audio Preview'}
          </div>
          <div className="text-sm font-medium text-white truncate">{title}</div>
          {hasError && (
            <div className="text-xs text-rose-300 mt-0.5 font-sans">
              {isIndo ? 'File audio saat ini belum tersedia' : 'Audio stream currently unavailable'}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-covenant-300 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-covenant-950 rounded-lg appearance-none cursor-pointer accent-covenant-400"
        />

        {/* Volume Slider */}
        <div className="flex items-center space-x-2 mt-2">
          <Volume2 className="w-4 h-4 text-covenant-300" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1.5 bg-covenant-950 rounded-lg appearance-none cursor-pointer accent-covenant-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-covenant-500 hover:bg-covenant-400 text-covenant-950 font-bold transition-transform active:scale-95 shadow-md"
          aria-label={
            isPlaying
              ? isIndo ? 'Jeda Audio' : 'Pause Audio'
              : isIndo ? 'Putar Audio' : 'Play Audio'
          }
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="p-2 text-covenant-300 hover:text-white transition-colors"
          aria-label={
            isMuted
              ? isIndo ? 'Bunyikan Suara' : 'Unmute Audio'
              : isIndo ? 'Bisukan Suara' : 'Mute Audio'
          }
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
