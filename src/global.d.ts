interface Window {
  Telegram?: {
    WebApp: {
      BackButton: {
        show: () => void;
        onClick: (cb: () => void) => void;
        offClick: (cb: () => void) => void;
        hide: () => void;  
      };
      close: () => void;
      onEvent: (event: string, cb: () => void) => void;
      offEvent: (event: string, cb: () => void) => void;
    };
  };
}
