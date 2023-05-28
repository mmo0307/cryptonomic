import { RefObject, useEffect, useRef } from 'react';

type VideoPlayerProps = {
  src: string;
  videoRef?: RefObject<HTMLVideoElement>;
  muted?: boolean;
};

type VideoPlayerHookReturn = {
  videoRef: RefObject<HTMLVideoElement>;
  src: string;
  muted?: boolean;
};

const useVideo = (props: Partial<VideoPlayerProps>): VideoPlayerHookReturn => {
  const { src, muted } = props;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (video) {
        const { top, bottom } = video.getBoundingClientRect();

        // Запустить видео, когда оно появляется на экране
        if (top < window.innerHeight && bottom >= 0) {
          video.play();
        } else {
          video.pause();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <VideoPlayerHookReturn>{ videoRef, src, muted };
};
export { useVideo };

export type { VideoPlayerHookReturn, VideoPlayerProps };
