// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found. Set VITE_GA_TRACKING_ID environment variable.');
    return;
  }

  // Create script tag for gtag
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_TRACKING_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific tracking functions for the allowance calculator
export const trackAllowanceCalculation = (baseAmount: number, finalAmount: number, bonusType: string, isRobloxMode: boolean) => {
  trackEvent('calculate_allowance', 'allowance_calculator', `${bonusType}_bonus`, Math.round(finalAmount));
  
  // Track additional details
  trackEvent('bonus_type_selected', 'allowance_calculator', bonusType);
  trackEvent('mode_used', 'allowance_calculator', isRobloxMode ? 'auto_bonus' : 'custom_bonus');
};

export const trackChoreGradeChange = (grade: number) => {
  trackEvent('chore_grade_change', 'user_interaction', `grade_${grade}`, grade);
};

export const trackPresetAction = (action: 'save' | 'load' | 'delete', presetName?: string) => {
  trackEvent(`preset_${action}`, 'preset_management', presetName);
};

export const trackModeToggle = (isRobloxMode: boolean) => {
  trackEvent('mode_toggle', 'user_interaction', isRobloxMode ? 'auto_bonus_enabled' : 'custom_bonus_enabled');
};