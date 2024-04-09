import { AccordionData } from "@/types";
import styles from "./accordion.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

interface AccordionProps {
  content: Array<AccordionData>;
  color: "--ez-orange" | "--adobe-purple";
}

export function Faq({ content, color }: AccordionProps) {
  const [active, setActive] = useState<string>("-1");
  const [windowWidth] = useWindowSize();

  function hoverHandler(id: string) {
    setActive(id);
  }

  function getTitleColor(id: string) {
    if (active === id && color !== "--adobe-purple") {
      return "#000";
    }
    if (windowWidth <= 800 && color === "--ez-orange") {
      return "#000";
    } else return "#fff";
  }

  function getDescriptionPosition(id: string) {
    if (windowWidth > 800) {
      if (active === id) {
        return "relative";
      } else return "absolute";
    } else return "relative";
  }

  function getDescriptionAnimation(id: string) {
    if (windowWidth > 800) {
      if (active === id) return 0;
      else return 65;
    } else return 0;
  }
  return (
    <div id="faqs" className={styles.accordion}>
      <p className={styles.heading}>FAQS</p>
      <div>
        {content.map((item) => (
          <div
            className={classNames(styles.accordionSection, styles.faqSection)}
            key={item.id}
            onMouseOver={() => hoverHandler(item.id)}
            onMouseLeave={() => hoverHandler("-1")}
            style={{
              backgroundColor:
                active === item.id || windowWidth <= 800
                  ? `var(${color})`
                  : "#000",
            }}
          >
            <motion.h1
              layout
              initial={{
                y: windowWidth > 800 ? -40 : 0,
              }}
              transition={{ duration: 0.2 }}
              className={classNames(
                styles.accordionTitleFaq,
                item.wrap ? "" : styles.noWrap,
              )}
              style={{
                color: getTitleColor(item.id),
              }}
            >
              {item.title}
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: windowWidth > 800 ? -20 : 0,
              }}
              animate={{
                opacity: active === item.id || windowWidth <= 800 ? 1 : 0,
                y: getDescriptionAnimation(item.id),
              }}
              className={classNames(styles.descriptionFaq)}
              style={{
                color: color === "--adobe-purple" ? "#fff" : "#000",
                position: getDescriptionPosition(item.id),
              }}
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
}