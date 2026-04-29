// dummy_data/bannerData.ts

import { HomepageBanner } from "@/types/banner";

export const bannerData: HomepageBanner[] = [
  //  HERO
  {
    id: "b1",
    image: "/banner/banner1.png",
    keyword: "hero-banner-1",
    placement: "hero",
    preset: "hero"
  },
  {
    id: "b2",
    image: "/banner/banner2.png",
    keyword: "hero-banner-2",
    placement: "hero",
    preset: "hero"
  },

  // 🌿 AFTER RETREAT
  {
    id: "b3",
    image: "/banner/banner4.png",
    keyword: "adventure-banner",
    placement: "after_adventure",
    preset: "section"
  },

  // 🏔 AFTER ADVENTURE
  {
    id: "b4",
    image: "/banner/banner5.png",
    keyword: "adventure-banner",
    placement: "after_adventure",
    preset: "section"
  },

  // 🎉 AFTER FEST
  {
    id: "b5",
    image: "/banner/banner6.png",
    keyword: "fest-banner",
    placement: "after_tirth",
    preset: "compact"
  },

  // 🛕 AFTER TIRTH
  {
    id: "b6",
    image: "/banner/banner1.png",
    keyword: "tirth-banner",
    placement: "after_tirth",
    preset: "compact"
  },

];