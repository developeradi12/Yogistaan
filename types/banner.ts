export type BannerPlacement =
  | "hero"
  | "after_adventure"
  | "after_tirth"


export type BannerPreset =
  | "hero"
  | "section"
  | "compact";

export interface HomepageBanner {
  id: string;
  image: string;
  keyword: string;

  placement: BannerPlacement;
  preset?: BannerPreset;
}

export function groupBanners(
  banners: HomepageBanner[]
): Record<BannerPlacement, HomepageBanner[]> {
  const initial: Record<BannerPlacement, HomepageBanner[]> = {
    hero: [],
    after_adventure: [],
    after_tirth: []
  };

  return banners.reduce((acc, banner) => {
    acc[banner.placement].push(banner);
    return acc;
  }, initial);
}


export const placementToPreset: Record<BannerPlacement, BannerPreset> = {
  hero: "hero",
  after_adventure: "section",
  after_tirth: "compact",
};