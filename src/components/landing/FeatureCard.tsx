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
               bg-[#0A2A4A]/30 backdrop-blur-sm
               border border-[#0EA5E9]/50 hover:border-[#0EA5E9]
               shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:shadow-[0_0_60px_rgba(14,165,233,0.6)]
               transform transition-all duration-300
               perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${color})` }}></div>
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300
                    drop-shadow-[0_0_10px_rgba(14,165,233,0.6)]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-[#B4D4E7]
                   group-hover:scale-105 transition-transform duration-300
                   drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
        {title}
      </h3>
      <p className="text-[#B4D4E7]/80 leading-relaxed
                  drop-shadow-[0_0_5px_rgba(14,165,233,0.4)]">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;