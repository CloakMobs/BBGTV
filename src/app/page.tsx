"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BLOOMBERG_M3U8 = "https://dai.google.com/linear/hls/pa/event/BVlOmFGaTi6NpchccR14yA/stream/74023e3a-3644-4dd2-a618-6c375fc40fe6:MRN2/variant/fd3e9ee6e0c218e857d9c21e6e2189a0/bandwidth/3000000.m3u8";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = BLOOMBERG_M3U8;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(BLOOMBERG_M3U8);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Bloomberg TV Livestream</CardTitle>
        </CardHeader>
        <CardContent>
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full rounded shadow"
            poster="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iPq8U2d4Qn1w/v0/-1x-1.jpg"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            For personal use only. Source: bloomberg.com/live/us
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
