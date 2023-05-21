import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function scrollToElement(elementOrElementId: string | HTMLElement) {
  const elementNode =
    typeof elementOrElementId === "string"
      ? (document.querySelector(`#${elementOrElementId}`) as
          | HTMLElement
          | undefined)
      : elementOrElementId;

  if (elementNode) {
    const y = elementNode.getBoundingClientRect().top + window.scrollY;
    const direction = window.scrollY + window.innerHeight / 2 > y ? 1 : -1;
    const offset = 60;

    gsap.fromTo(
      window,
      {
        scrollTo: {
          y: y + offset * direction,
        },
      },
      {
        scrollTo: { y },
        duration: 0.75,
        ease: "power2",
      }
    );
  } else {
    console.error("Element was not found:", elementOrElementId);
  }
}
