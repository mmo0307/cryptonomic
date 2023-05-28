import React from 'react';
import { useVideo } from '@entities/video/video.props';
import { hoc } from '@shared/lib';

const VideoPlayer = hoc(useVideo, ({ muted, src, videoRef }) => (
  <video ref={videoRef} src={src} muted={muted} />
));

export { VideoPlayer };
