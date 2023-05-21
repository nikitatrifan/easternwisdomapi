"use client";

import { useMedia, useThemeClassName } from "junoblocks";
import { RecoilRoot } from "recoil";

import { useIsRenderingOnServerSide } from "@/app/useIsRenderingOnServerSide";
import { useApplyThemeConfiguration } from "@/app/useApplyThemeConfiguration";

import { ReactNode } from "react";

type Props = { children: ReactNode };

function BodyContents({ children }: Props) {
  const isRenderingOnServerSide = useIsRenderingOnServerSide();

  const themeClassName = useThemeClassName();
  // useSubscribeDefaultAppTheme()
  useApplyThemeConfiguration();

  const isSmallScreen = useMedia("sm");

  return (
    <body>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NJM64WS"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <div
        data-app-wrapper=""
        id="scroller"
        lang="en-US"
        // @ts-ignore
        className={isRenderingOnServerSide ? null : themeClassName}
        suppressHydrationWarning={true}
      >
        {isRenderingOnServerSide ? null : <>{children}</>}
      </div>
    </body>
  );
}

export function Body({ children }: Props) {
  return (
    <RecoilRoot>
      <BodyContents>{children}</BodyContents>
    </RecoilRoot>
  );
}
