declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
    });
  }
};

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackContactForm = () => {
  trackEvent('contact_form_submit');
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', {
    service_name: serviceName,
  });
}; 