import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50">
      {/* Blue Blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: ['0%', '5%', '0%'],
          y: ['0%', '5%', '0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] min-w-[500px] aspect-square rounded-full bg-blue-300/50"
        style={{ filter: 'blur(120px)' }}
      />
      {/* Purple Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: ['0%', '-5%', '0%'],
          y: ['0%', '10%', '0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] right-[-10%] w-[50vw] min-w-[400px] aspect-square rounded-full bg-purple-300/50"
        style={{ filter: 'blur(140px)' }}
      />
      {/* Indigo Blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: ['0%', '8%', '0%'],
          y: ['0%', '-8%', '0%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[20%] w-[70vw] min-w-[600px] aspect-square rounded-full bg-indigo-300/40"
        style={{ filter: 'blur(140px)' }}
      />
      
      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
    </div>
  );
}
