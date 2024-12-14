import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Tutorial = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Tutorial</h2>
      <p className="mb-4">
        Welcome to the Skill Chain game! In this game, you will connect different skills to progress.
      </p>
      <Button variant="primary" onClick={() => console.log("Start Game")}>
        Start Game
      </Button>
    </motion.div>
  );
};

export default Tutorial;
