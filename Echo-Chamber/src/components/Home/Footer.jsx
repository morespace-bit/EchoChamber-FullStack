import { motion } from "framer-motion";

export default function Footer() {
  // class contaier
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="h-180 bg-blue-300 flex rounded-t-2xl  flex-col overflow-x-hidden px-4 md:mt-0"
    >
      {/* the noise image */}
      <div className="py-5  flex justify-center overflow-hidden w-full md:px-3">
        <div className="w-115 h-120 overflow-hidden rounded-2xl bg-[url('/bg.jpg')] bg-cover bg-left-bottom flex items-center justify-center md:w-full">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl p-3 font-[1000] font-[Open sans] text-zinc-700 md:w-250 md:text-5xl"
          >
            Help us build a better online space. Your support empowers real
            conversations, meaningful connections, and a more peaceful digital
            future interaction at a time.
          </motion.p>
        </div>
      </div>
      {/* the logo or text echo-chaamber */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="w-full px-1"
      >
        <h2 className="text-5xl  font-black text-white font-[Inter] md:text-8xl md:tracking-normal">
          EchoChamber.
        </h2>
      </motion.div>
      <div className="border-1 border-t-gray-700 w-full mt-2"></div>
      {/* the privacy stff and so on and all rights reserved */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col gap-9"
      >
        <div className="flex gap-6 text-left px-2 mt-2 text-zinc-700 cursor-pointer">
          <p>Privacy Policy</p>
          <p>Terms of Services</p>
        </div>
        <div className="">
          <p>&copy; EchoChamber. All right reserved. Nirmal Chhetri</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
