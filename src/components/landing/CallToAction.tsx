import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="text-center relative overflow-hidden
               rounded-2xl p-12
               bg-[#1A1F2C]/80 backdrop-blur-lg
               border-2 border-[#8B5CF6]
               shadow-[0_0_60px_rgba(139,92,246,0.8)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-[#8B5CF6]/10 to-[#F97316]/10"></div>
      <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.9)]">
        Prêt à Transformer Votre Carrière ?
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]">
        Rejoignez une communauté de professionnels motivés et commencez votre voyage vers l'excellence dès aujourd'hui.
      </p>
      <Button
        onClick={() => navigate("/auth")}
        className="px-8 py-6 text-lg rounded-xl
                 bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#7c4ef3] hover:to-[#8b76f3]
                 shadow-[0_0_40px_rgba(139,92,246,0.7)] hover:shadow-[0_0_60px_rgba(139,92,246,0.9)]
                 transform hover:-translate-y-1 transition-all duration-300
                 border-2 border-[#8B5CF6]/80"
      >
        Commencer Maintenant
      </Button>
    </motion.div>
  );
};

export default CallToAction;