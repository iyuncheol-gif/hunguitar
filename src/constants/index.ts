// Site
export { siteConfig } from "./site";

// Navigation
export { navItems, quickLinks, socialLinks } from "./navigation";

// Contact
export { contactMethods, locationInfo, KAKAO_MAP_APP_KEY } from "./contact";

// Services
export { services, trialLessons, testimonials } from "./services";

// Gallery
export { benefits, galleryImages } from "./gallery";

// Lesson
export type { Teacher } from "./lesson";
export {
  teachers,
  lessonCategories,
  lessonDetails,
  youtubeVideos,
} from "./lesson";

// Contents
export type { BlogPost } from "./contents";
export { featuredContent, blogPosts, INITIAL_DISPLAY_COUNT } from "./contents";

// Students
export type { StudentVoice } from "./students";
export { studentVoices } from "./students";

// Pricing
export type { PriceItem } from "./pricing";
export { priceHighlights, priceGroups, priceNote } from "./pricing";
