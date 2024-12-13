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
               border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60
               shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]
               transform transition-all duration-300
               perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${color})` }}></div>
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundImage: `linear-gradient(to right, ${color})` }}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;