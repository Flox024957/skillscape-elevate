import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Main Circle */}
      <motion.div
        className="relative"
        animate={{
          scale: [0.18, 0.7, 0.18],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          width: '100vw',
          height: '100vw',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(14,165,233,0.15), rgba(30,174,219,0.15))',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(14,165,233,0.1)'
        }}
      >
        {/* Subtle Inner Glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [360, 0],
            scale: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            background: 'linear-gradient(-45deg, rgba(14,165,233,0.1), transparent)',
            mixBlendMode: 'soft-light'
          }}
        />

        {/* Ethereal Glow Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            boxShadow: '0 0 60px rgba(14,165,233,0.2), 0 0 120px rgba(14,165,233,0.1)',
            background: 'radial-gradient(circle at center, rgba(14,165,233,0.15), transparent)'
          }}
        />

        {/* Refined Orbital Ring */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(14,165,233,0.08)',
            boxShadow: '0 0 40px rgba(14,165,233,0.15), 0 0 80px rgba(14,165,233,0.05)'
          }}
        />
      </motion.div>

      {/* Subtle Background Accent */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(14,165,233,0.08), transparent 70%)'
        }}
      />
    </div>
  );
};