"use client"

interface VideoProps {
  src: string
  caption?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  poster?: string
}

export function Video({
  src,
  caption,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  poster,
}: VideoProps) {
  // Check if it's a YouTube or Vimeo URL
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be")
  const isVimeo = src.includes("vimeo.com")

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }

  return (
    <figure className="my-6">
      <div className="relative rounded-xl border border-border overflow-hidden bg-muted/30">
        {isYouTube ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(src)}${autoplay ? "?autoplay=1" : ""}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : isVimeo ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://player.vimeo.com/video/${getVimeoId(src)}${autoplay ? "?autoplay=1" : ""}`}
              title="Vimeo video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={src}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            poster={poster}
            className="w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
