import { motion } from "framer-motion";
import AudioTab from "@/components/dashboard/tabs/AudioTab";

const AudioPage = () => {
  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold">Lecteur Audio</h1>
        <AudioTab />
      </motion.div>
    </div>
  );
};

export default AudioPage;