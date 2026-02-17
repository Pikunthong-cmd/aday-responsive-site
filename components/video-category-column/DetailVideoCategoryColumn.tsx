import SectionContainer from "../layout/SectionContainer";

type Props = {
  videoSrc?: string;
  poster?: string;
  title?: string;
  content?: string;
};

const stripHtml = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, "").trim();

const extractYoutubeEmbed = (html?: string) => {
  const s = html ?? "";
  const m = s.match(
    /<iframe[^>]+src="([^"]+youtube\.com\/embed\/[^"]+)"[^>]*>/i
  );
  return m?.[1] ?? "";
};

export default function DetailVideoCategoryColumn({
  videoSrc,
  poster,
  title,
  content,
}: Props) {
  const yt = extractYoutubeEmbed(content);

  const cleanTitle = stripHtml(title);

  const cleanText = stripHtml(content)
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return (
    <SectionContainer padded className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="w-full lg:sticky lg:top-24">
          <div className="overflow-hidden bg-black/5 shadow-sm">
            {yt ? (
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full"
                  src={yt}
                  title={cleanTitle || "Video"}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : videoSrc ? (
              <video
                className="w-full aspect-video object-cover"
                controls
                poster={poster}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full aspect-video bg-black/5" />
            )}
          </div>
        </div>

        <div>
          <h1 className="h1">{cleanTitle}</h1>

          {cleanText ? (
            <p className="mt-4 text-md leading-[1.8] text-black/75 whitespace-pre-line">
              {cleanText}
            </p>
          ) : null}
        </div>
      </div>
    </SectionContainer>
  );
}
