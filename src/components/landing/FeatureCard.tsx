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
               bg-background/30 backdrop-blur-sm
               border border-[#F97316] hover:border-[#F97316]
               shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)]
               transform transition-all duration-300
               perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${color})` }}></div>
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[#D1D5DB] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                     group-hover:scale-105 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-[#9CA3AF] leading-relaxed drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;