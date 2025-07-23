import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Video, Calendar, Clock, Download, Share2, Compress, AlertTriangle, RefreshCw, Monitor, Smartphone } from 'lucide-react';

interface CowVideoPlayerProps {
  className?: string;
}

const CowVideoPlayer: React.FC<CowVideoPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoQuality, setVideoQuality] = useState<'HD' | 'SD' | 'Low'>('HD');
  const [videoError, setVideoError] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('Component loaded');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample video URLs - you can replace these with your actual hosted videos
  const videoSources = [
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Sample video
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Another sample
    '/Cow Video.mp4' // Your local video (if available)
  ];

  useEffect(() => {
    // Reset error state when component mounts
    setVideoError(false);
    setIsLoading(true);
    setDebugInfo('Component mounted, video loading...');
    console.log('CowVideoPlayer component mounted');
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
          setVideoError(true);
          setDebugInfo(`Play error: ${error.message}`);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoError(false);
      setIsLoading(false);
      setDebugInfo('Video metadata loaded successfully');
      console.log('Video metadata loaded:', videoRef.current.duration);
    }
  };

  const handleVideoError = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', event);
    setVideoError(true);
    setIsLoading(false);
    setDebugInfo('Video error occurred');
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(error => {
          console.error('Error entering fullscreen:', error);
        });
      }
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleRetryLoading = () => {
    setVideoError(false);
    setIsLoading(true);
    setDebugInfo('Retrying video load...');
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Video className="w-6 h-6 text-blue-600" />
          <span>Live Cow Monitoring</span>
        </h2>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live Feed</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Using: Sample Video (Demo)</p>
        </div>

        {/* Video Player */}
        <div className="relative">
          {videoError ? (
            <div className="flex flex-col items-center justify-center h-64 md:h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Not Available</h3>
              <p className="text-gray-600 mb-4">This is a demo video player. In production, you would connect to your actual cow monitoring cameras.</p>
              <button
                onClick={handleRetryLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Demo Video</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              {isLoading && (
                <div className="flex items-center justify-center h-64 md:h-80">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading video...</p>
                  </div>
                </div>
              )}
              <video
                ref={videoRef}
                className={`w-full h-64 md:h-80 bg-black rounded-lg ${isLoading ? 'hidden' : ''}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={handleVideoError}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                controls
                preload="metadata"
                style={{ border: '2px solid #10b981' }}
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>

      {/* Video Controls */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold text-blue-900 mb-3">
            <Play className="w-4 h-4" />
            <span>Video Details</span>
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Duration:</span> {duration > 0 ? formatTime(duration) : 'Auto-detected'}</p>
            <p><span className="font-medium">Quality:</span> {videoQuality}</p>
            <p><span className="font-medium">Source:</span> Demo Camera</p>
            <p><span className="font-medium">Current:</span> Sample Video</p>
            <p><span className="font-medium">Status:</span> {videoError ? 'error' : isLoading ? 'loading' : 'ready'}</p>
            <p><span className="font-medium">Size:</span> Demo</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold text-green-900 mb-3">
            <Calendar className="w-4 h-4" />
            <span>Recording Info</span>
          </h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Date:</span> Current</p>
            <p><span className="font-medium">Location:</span> Demo Barn</p>
            <p><span className="font-medium">Camera:</span> Demo-Cam-01</p>
            <p><span className="font-medium">File:</span> Sample Video</p>
            <p><span className="font-medium">Size:</span> Demo</p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="flex items-center space-x-2 font-semibold text-purple-900 mb-3">
            <Download className="w-4 h-4" />
            <span>Actions</span>
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Download Video
            </button>
            <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
              Share Link
            </button>
            <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm">
              Compress Video
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {videoError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-900 font-semibold mb-2">Demo Mode</h3>
          <p className="text-red-700">This is a demonstration video player. In production, connect to your actual cow monitoring cameras.</p>
        </div>
      )}
    </div>
  );
};

export default CowVideoPlayer; 