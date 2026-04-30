declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GAEventParams = {
  page_view: { page_path: string; page_location?: string; page_title?: string };
  nav_click: {
    label: string;
    location:
      | 'navbar'
      | 'mobile_sidebar'
      | 'dropdown_about'
      | 'dropdown_programs'
      | 'dropdown_community';
  };
  cta_click: { label: string; location: string };
  footer_click: {
    label: string;
    category:
      | 'social'
      | 'ecosystem'
      | 'program'
      | 'membership'
      | 'community'
      | 'page'
      | 'contact';
  };
  form_submit: { form_name: string; success: boolean };
  share: {
    method: 'whatsapp' | 'twitter' | 'copy_link';
    content_type: string;
    item_id: string;
  };
  card_click: { card_type: 'event' | 'news' | 'program'; slug: string };
  carousel_nav: {
    carousel: 'process' | 'news_events' | 'services';
    direction: 'prev' | 'next';
  };
  audio_toggle: { enabled: boolean; source: 'floater' | 'startup' };
  startup_choice: { choice: 'ambience' | 'silence' };
  program_point_click: { program: string; point_id: string };
  services_interact: {
    action: 'menu_click' | 'mobile_arrow' | 'mobile_cta' | 'carousel_arrow';
    direction?: 'prev' | 'next';
    program?: string;
  };
  ui_close: { target: string };
};

export type GAEventName = keyof GAEventParams;

export function pageview(measurementId: string, url: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('config', measurementId, { page_path: url });
}

export function trackEvent<T extends GAEventName>(
  name: T,
  params?: GAEventParams[T]
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params ?? {});
}
