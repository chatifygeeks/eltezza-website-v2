import { useState } from "react";
import styles from "./accordion.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames";
import { AccordionData } from "@/types";
import useWindowSize from "@/hooks/useWindowSize";

interface AccordionProps {
  content: Array<AccordionData>;
  color: "--ez-orange" | "--adobe-purple";
}

export function Services({ content, color }: AccordionProps) {
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

  return (
    <div id="services" className={styles.accordion}>
      <p className={styles.heading}>WHAT WE DO | SERVICES</p>
      <div>
        {content.map((item) => (
          <div
            className={classNames(styles.accordionSection)}
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
            <h1
              className={classNames(
                styles.accordionTitleService,
                item.wrap ? "" : styles.noWrap,
              )}
              style={{
                color: getTitleColor(item.id),
              }}
            >
              {item.title}
            </h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 0,
              }}
              animate={{
                opacity: active === item.id || windowWidth <= 800 ? 1 : 0,
              }}
              className={classNames(styles.descriptionServices)}
              style={{
                color: color === "--adobe-purple" ? "#fff" : "#000",
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