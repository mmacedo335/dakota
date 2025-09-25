import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCssHandles } from "vtex.css-handles";
import "./style.css";

interface VideoPlayerProps {
  videoUrl: string;
  videoUrlMobile: string;
  playIcon?: string;
  thumbUrl?: string;
  autoplay?: boolean; // Adicionada a prop 'autoplay'
}

const CSS_VIDEO = [
  "video__player",
  "video__player-wrapper",
  "video__player-thumb",
  "video__player-video",
  "video__player-iconPlay",
  "react-player__preview"
] as const;

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { videoUrl, videoUrlMobile, playIcon, thumbUrl, autoplay } = props;
  const { handles } = useCssHandles(CSS_VIDEO);

  // O estado inicial 'isPlaying' agora depende da prop 'autoplay'.
  // Se 'autoplay' for true, o vídeo já começa tocando.
  const [isPlaying, setIsPlaying] = useState(autoplay || false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={handles.video__player}>
      <div className={handles["video__player-wrapper"]} style={{ position: "relative" }}>
        {/* A thumbnail e o botão de play só aparecem se 'isPlaying' for falso */}
        {!isPlaying && thumbUrl && (
          <img
            src={thumbUrl}
            alt="Thumbnail"
            className={handles["video__player-thumb"]}
            style={{
              width: "100%",
              display: "block",
              position: "absolute",
              height: "-webkit-fill-available",
              objectFit: "cover",
            }}
          />
        )}

        <ReactPlayer
          url={window.innerWidth > 1024 ? videoUrl : videoUrlMobile}
          playing={isPlaying}
          controls={true}
          // Para que o autoplay funcione em navegadores, o vídeo precisa estar mudo.
          // Se 'autoplay' for true, o volume é 0. Caso contrário, é 1.
          muted={autoplay ? true : false}
          loop={true}
          width="100%"
          height="auto"
          volume={autoplay ? 0 : 1}
          className={handles["video__player-video"]}
        />

        {/* O botão de play só aparece se o autoplay não estiver ativo e o vídeo não estiver tocando */}
        {!isPlaying && (
          <button
            className={handles["video__player-iconPlay"]}
            onClick={handlePlay}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            <img src={playIcon || "https://example.com/play-icon.svg"} alt="Play" width="80" />
          </button>
        )}
      </div>
    </div>
  );
};

VideoPlayer.schema = {
  title: "Video Player",
  description: "A customizable video player component",
  type: "object",
  properties: {
    videoUrl: {
      title: "Video URL Desktop",
      description: "The URL of the video to display",
      type: "string",
      default: "https://link-do-seu-video.mp4"
    },
    videoUrlMobile: {
      title: "Video URL Mobile",
      description: "The URL of the video to display",
      type: "string",
      default: "https://link-do-seu-video.mp4"
    },
    playIcon: {
      title: "Play Icon URL",
      description: "URL of the custom play icon",
      type: "string",
      default: "https://example.com/play-icon.svg"
    },
    thumbUrl: {
      title: "Thumbnail Image URL",
      description: "URL of the video thumbnail",
      type: "string",
      default: "https://example.com/thumbnail.jpg"
    },
    autoplay: {
      title: "Autoplay",
      description: "Start the video automatically",
      type: "boolean",
      default: false
    }
  },
}
