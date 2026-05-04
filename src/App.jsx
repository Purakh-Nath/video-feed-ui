import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10")
      .then((res) => res.json())
      .then((res) => {
        const list = res?.data?.data || [];
        setVideos(list);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="px-6 py-4 border-b border-zinc-800">
        <h1 className="text-lg font-semibold">Video Feed</h1>
      </header>

      <main className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => {
            const video = v?.items;

            return (
              <div
                key={video?.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <img
                  src={video?.snippet?.thumbnails?.high?.url}
                  className="w-full aspect-video object-cover"
                />

                <div className="p-3">
                  <h2 className="text-sm font-medium line-clamp-2">
                    {video?.snippet?.title}
                  </h2>

                  <p className="text-xs text-zinc-400 mt-1">
                    {video?.snippet?.channelTitle}
                  </p>

                  <div className="text-xs text-zinc-500 mt-2 flex justify-between">
                    <span>{video?.statistics?.viewCount || 0} views</span>
                    <span>{video?.statistics?.likeCount || 0} likes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;