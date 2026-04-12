import { useEffect, useRef } from 'react';

export function useAndroidBackButton(isOpen: boolean, onClose: () => void) {
  const isHandlingPopState = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const id = Math.random().toString(36).substring(2, 9);
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.modalId === id) {
        return;
      }
      isHandlingPopState.current = true;
      e.preventDefault();
      onCloseRef.current();
    };

    // Push a dummy state to trap the next back navigation
    window.history.pushState({ modalId: id }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Clean up the dummy state if the modal closed via other means (e.g. click outside)
      if (!isHandlingPopState.current) {
        if (window.history.state && window.history.state.modalId === id) {
          window.history.back();
        }
      }
      isHandlingPopState.current = false;
    };
  }, [isOpen]);
}
