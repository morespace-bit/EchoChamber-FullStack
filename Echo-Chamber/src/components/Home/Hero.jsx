import { motion } from "framer-motion";

function Hero() {
  return (
    <>
      <div
        className=" relative border-t-[0.2px] border-white bg-blue-600 h-185 flex px-6 bg-[url('/map.jpg')] bg-center bg-blend-overlay bg-cover "
        id="home"
      >
        <div className="absolute bg-blue-600/60 inset-0"></div>

        {/* the text content and discover button  */}
        <motion.div
          className="flex absolute bottom-30 flex-col md:px-30 md:bottom-40"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* text and echo-chamber community */}
          <motion.div
            className="flex flex-col text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-4xl text-white font-bold font-sans">
              Echo-Chamber. Community
            </p>
            <p className="mt-3 text-[17px] font-semibold text-white font-sans">
              This is the place to share peace and vibes and have truly fun.
            </p>
            <p className="text-[17px] font-semibold text-white font-sans">
              A non-political place!
            </p>
          </motion.div>

          {/* how many people connected */}
          <motion.div
            className="flex mt-8 flex-col text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-3xl text-white font-semibold">10,24,553</p>
            <p className="mt-1 font-semibold text-white">Connected peoples</p>
            <p className="mt-1 font-semibold text-white">Enjoying peace</p>
          </motion.div>

          <motion.button
            className="py-3 text-left mt-8 border-1 w-40 px-7 border-white rounded-2xl text-white font-semibold cursor-pointer hover:bg-cyan-500 hover:scale-105 duration-150 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            Discover Now
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute right-40 top-40 hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 60 }}
        >
          <div className="flex">
            <img src="/hello.png" alt=" " className="w-200 " />
            <motion.p
              className="absolute text-7xl bottom-110 right-80 font-black text-white translate-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              Hello!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Hero;
