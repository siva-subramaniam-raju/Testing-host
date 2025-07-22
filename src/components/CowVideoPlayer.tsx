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
    if (videoRef.current) {
      setIsLoading(true);
      setVideoError(false);
      setDebugInfo('Retrying video load...');
      videoRef.current.load();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const videoSources = [
    '/Cow Video.mp4',
    '/result (52).mp4',
    '/test-video.mp4',
    '/video.mp4'
  ];

  return (
    <div className={`dashboard-card p-6 ${className}`} style={{ border: '2px solid #3b82f6' }}>
      {/* Debug Info */}
      <div className="mb-4 p-2 bg-blue-100 text-blue-800 text-xs rounded">
        Debug: {debugInfo}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cow Monitoring Video</h1>
            <p className="text-sm text-gray-600">Live feed from barn cameras</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            title="Today's recordings"
          >
            <Calendar className="w-4 h-4" />
            <span>Today</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </button>
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            title="Live feed"
          >
            <Clock className="w-4 h-4" />
            <span>Live Feed</span>
          </button>
        </div>
      </div>

      {/* Video Quality Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Quality:</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setVideoQuality('HD')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  videoQuality === 'HD' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="High Definition"
              >
                HD
              </button>
              <button
                onClick={() => setVideoQuality('SD')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  videoQuality === 'SD' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Standard Definition"
              >
                SD
              </button>
              <button
                onClick={() => setVideoQuality('Low')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  videoQuality === 'Low' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Low Quality"
              >
                Low
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Using: /Cow Video.mp4 (79MB)</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                deviceView === 'desktop' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Desktop view"
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                deviceView === 'mobile' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-h-80 flex items-center justify-center" style={{ border: '2px solid #ef4444' }}>
            {videoError ? (
              <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-600 mb-2">Video Loading Notice</h3>
                <p className="text-gray-600 mb-4">Video not accessible: 404 Not Found</p>
                <button
                  onClick={handleRetryLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Loading</span>
                </button>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Try different video sources:</p>
                  <div className="space-y-1">
                    {videoSources.map((source, index) => (
                      <button
                        key={index}
                        className="block text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {source}
                      </button>
                    ))}
                  </div>
                </div>
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
                  <source src="/Cow Video.mp4" type="video/mp4" />
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
              <p><span className="font-medium">Source:</span> Farm Camera</p>
              <p><span className="font-medium">Current:</span> /Cow Video.mp4</p>
              <p><span className="font-medium">Status:</span> {videoError ? 'error' : isLoading ? 'loading' : 'ready'}</p>
              <p><span className="font-medium">Size:</span> 79MB</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="flex items-center space-x-2 font-semibold text-green-900 mb-3">
              <Calendar className="w-4 h-4" />
              <span>Recording Info</span>
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Date:</span> Current</p>
              <p><span className="font-medium">Location:</span> Main Barn</p>
              <p><span className="font-medium">Camera:</span> Cam-01</p>
              <p><span className="font-medium">File:</span> Cow Video.mp4</p>
              <p><span className="font-medium">Size:</span> 79MB</p>
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
      </div>

      {/* Error Message */}
      {videoError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-900 font-semibold mb-2">Error loading video</h3>
          <p className="text-red-700">Failed to load video</p>
        </div>
      )}
    </div>
  );
};

export default CowVideoPlayer; 