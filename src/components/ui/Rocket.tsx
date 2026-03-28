import { motion } from 'framer-motion';

// Rachetă animată afișată la tranziția între niveluri
export default function Rocket(): JSX.Element {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      animate={{ y: [-20, 20, -20], opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="text-8xl text-center"
      aria-hidden="true"
    >
      🚀
    </motion.div>
  );
}
