import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0f]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="loader-ring" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-blue-500 font-bold text-sm">DG</span>
              </div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
            <p className="text-gray-500 text-xs tracking-widest uppercase">Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
