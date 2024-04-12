import { IoMdExit } from "react-icons/io";
import styles from "../work.module.scss";
import { motion } from "framer-motion";
import { CreativeWorkData } from "@/types";

interface FullScreenVideoProps {
  video: CreativeWorkData;
  removeFullVideo: () => void;
}

export default function FullScreenVideo({
  video,
  removeFullVideo,
}: FullScreenVideoProps) {
  const animateUp = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
    exit: {
      y: "100%",
    },
  };
  return (
    <motion.div
      onClick={removeFullVideo}
      className={styles.fullScreenContainer}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.8,
        }}
        exit={{
          opacity: 0,
        }}
        className={styles.opacLayer}
      />
      <motion.div
        variants={animateUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.fullVideoWrapper}
      >
        <div className={styles.exit}>
          <IoMdExit size={50} />
        </div>
        <motion.video
          variants={animateUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.creativeVideoFull}
          poster={video.thumbnail}
          src={video.src}
          controls
          preload="metadata"
        >
          <source src={video.src} type="video/mp4" />
        </motion.video>
      </motion.div>
    </motion.div>
  );
}