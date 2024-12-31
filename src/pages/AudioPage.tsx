import { motion } from "framer-motion";
import AudioTab from "@/components/dashboard/tabs/AudioTab";

const AudioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1E3D] via-[#152A4A] to-[#1E3D7B]">
      <div className="container mx-auto p-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-[#E5DEFF] mb-8">
            Lecteur Audio
          </h1>
          <div className="glass-panel-pro p-6 backdrop-blur-xl">
            <AudioTab />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPage;