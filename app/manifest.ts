import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Forsecure — Offensive Security & Secure Engineering",
    short_name: "Forsecure",
    description:
      "Penetration testing, secure coding training, and cybersecurity consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f7f2",
    theme_color: "#071914",
    icons: [
      {
        src: "/forsecure_fs_ico.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
