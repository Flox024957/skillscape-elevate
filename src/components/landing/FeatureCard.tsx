import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const FeatureCard = ({ title, description, icon, color }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group p-8 rounded-2xl relative overflow-hidden
               bg-background/5 backdrop-blur-md
               border border-[#0369A1] hover:border-[#8B5CF6]
               shadow-[0_0_40px_rgba(3,105,161,0.6)] hover:shadow-[0_0_60px_rgba(139,92,246,0.8)]
               transform transition-all duration-300
               perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${color})` }}></div>
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white/90 drop-shadow-[0_0_8px_rgba(3,105,161,0.8)]
                     group-hover:scale-105 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed drop-shadow-[0_0_5px_rgba(3,105,161,0.5)]">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;