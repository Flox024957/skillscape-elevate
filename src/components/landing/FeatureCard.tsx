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
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      whileHover={{ scale: 1.03, rotateY: 5 }}
      className="group p-10 rounded-3xl relative overflow-hidden
               bg-[#0C4A6E]/5 backdrop-blur-md
               border border-[#0369A1]/20 hover:border-[#6E59A5]/30
               shadow-[0_0_30px_rgba(3,105,161,0.2)] hover:shadow-[0_0_50px_rgba(110,89,165,0.3)]
               transform transition-all duration-500
               perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${color})` }}></div>
      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-white/90
                     group-hover:bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] bg-clip-text group-hover:text-transparent
                     transition-all duration-500">
        {title}
      </h3>
      <p className="text-lg text-gray-300/80 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;