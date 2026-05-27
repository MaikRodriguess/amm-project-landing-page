export function trackEvent(eventName: string, eventData?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, eventData)
  }
}

export function trackPageView(pageName: string) {
  trackEvent('page_view', {
    page_title: pageName,
    page_path: window.location.pathname,
  })
}

export function trackGalleryEvent(action: string, albumName?: string) {
  trackEvent('gallery_interaction', {
    action,
    album_name: albumName || 'unknown',
  })
}

export function trackEventInteraction(eventName: string) {
  trackEvent('event_interaction', {
    event_name: eventName,
  })
}

export function trackMaterialDownload(bookTitle: string) {
  trackEvent('material_download', {
    book_title: bookTitle,
  })
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submission', {
    form_name: formName,
  })
}
