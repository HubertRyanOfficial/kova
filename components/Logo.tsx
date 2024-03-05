"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  width?: number;
  height?: number;
  hover?: boolean;
}

export default function Logo({
  width = 38,
  height = 38,
  hover = false,
}: Props) {
  return (
    <motion.div
      initial={{ rotate: -180 }}
      animate={{ rotate: 0 }}
      whileHover={{ rotate: hover ? 180 : 0 }}
      transition={{
        duration: 0.3,
        bounce: true,
      }}
    >
      <Image src="/logo.svg" width={width} height={height} alt="Kova brand" />
    </motion.div>
  );
}
