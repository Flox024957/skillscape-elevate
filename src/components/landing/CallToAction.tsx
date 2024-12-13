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
               bg-background/10 backdrop-blur-sm
               border border-[#8B5CF6]/30
               shadow-[0_0_40px_rgba(139,92,246,0.4)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 via-[#8B5CF6]/5 to-[#F97316]/5"></div>
      <h2 className="text-3xl font-bold mb-4 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Prêt à Transformer Votre Carrière ?
      </h2>
      <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
        Rejoignez une communauté de professionnels motivés et commencez votre voyage vers l'excellence dès aujourd'hui.
      </p>
      <Button
        onClick={() => navigate("/auth")}
        className="px-8 py-6 text-lg rounded-xl
                 bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#7c4ef3] hover:to-[#8b76f3]
                 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]
                 transform hover:-translate-y-1 transition-all duration-300
                 border border-[#8B5CF6]/50"
      >
        Commencer Maintenant
      </Button>
    </motion.div>
  );
};

export default CallToAction;