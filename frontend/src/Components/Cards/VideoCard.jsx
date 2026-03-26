function parseVideoUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Vimeo
    if (hostname.includes("vimeo.com")) {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match) {
        return {
          provider: "vimeo",
          embedUrl: `https://player.vimeo.com/video/${match[1]}?dnt=1`,
        };
      }
    }

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId = null;

      if (hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get("v");
      }

      if (videoId) {
        return {
          provider: "youtube",
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // Dailymotion
    if (hostname.includes("dailymotion.com") || hostname.includes("dai.ly")) {
      const match = url.match(
        /(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/,
      );
      if (match) {
        return {
          provider: "dailymotion",
          embedUrl: `https://www.dailymotion.com/embed/video/${match[1]}`,
        };
      }
    }

    return { provider: "unknown", embedUrl: null };
  } catch {
    return { provider: "unknown", embedUrl: null };
  }
}

export default function VideoCard({ id, videoUrl, title, onDelete }) {
  const { provider, embedUrl } = parseVideoUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div
        className={`w-72 rounded-lg border border-(--color-border-primary) bg-(--color-primary) p-4 text-center text-sm text-(--color-font-primary)`}
      >
        <p>Unable to embed video</p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-(--color-button-primary) hover:underline"
        >
          Open video link
        </a>
        <button
          onClick={() => onDelete(id)}
          className="text-(--color-font-primary"
        >
          x
        </button>
      </div>
    );
  }

  return (
    
    <div
      className={`w-72 overflow-hidden rounded-lg border border-(--color-border-primary) bg-(--color-primary) shadow-sm`}
    >
        
      <div className="relative aspect-video w-full">
        
        <iframe
          src={embedUrl}
          title={title || `${provider} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />

      </div>
      {title && (
          <div className="flex justify-between border-t border-(--color-border-secondary) px-3 py-2">
            <div>
              <p className="truncate text-sm font-medium text-(--color-font-primary)">
                {title}
              </p>
              <p className="text-xs capitalize text-(--color-font-secondary)">
                {provider}
              </p>
            </div>
            <button
              onClick={() => onDelete(id)}
              className="text-(--color-font-primary)"
            >
              x
            </button>
          </div>
        )}
    </div>
  );
}
