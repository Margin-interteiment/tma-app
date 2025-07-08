import { useEffect } from "react";
import { initClosingBehavior } from "@tma.js/sdk";
import { useInitData } from "@tma.js/sdk-react";

export const ClosingConfirmSetup = () => {
  const initData = useInitData();

  useEffect(() => {
    if (!initData) return;

    const [closingBehavior] = initClosingBehavior();
    closingBehavior.enableConfirmation();

    return () => {
      closingBehavior.disableConfirmation();
    };
  }, [initData]);

  return null;
};
