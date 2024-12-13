import { motion } from "framer-motion";
import AudioTab from "@/components/dashboard/tabs/AudioTab";

const AudioPage = () => {
  return (
    <div className="min-h-screen bg-futuristic-black">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold neon-text">Lecteur Audio</h1>
          <div className="glass-panel p-6">
            <AudioTab />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPage;