import * as React from "react";

const TABLET_BREAKPOINT_START = 768;
const TABLET_BREAKPOINT_END = 1200;

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${TABLET_BREAKPOINT_START}px) and (max-width: ${TABLET_BREAKPOINT_END - 1}px)`,
    );

    const update = () => setIsTablet(mql.matches);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, []);

  return isTablet;
}
