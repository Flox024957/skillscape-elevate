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
               bg-[#0A2A4A]/30 backdrop-blur-sm
               border border-[#0EA5E9]/30
               shadow-[0_0_40px_rgba(14,165,233,0.4)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 via-[#33C3F0]/5 to-[#1EAEDB]/5"></div>
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] text-transparent bg-clip-text
                    drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
        Prêt à Transformer Votre Carrière ?
      </h2>
      <p className="text-lg text-[#B4D4E7]/80 mb-8 max-w-2xl mx-auto">
        Rejoignez une communauté de professionnels motivés et commencez votre voyage vers l'excellence dès aujourd'hui.
      </p>
      <Button
        onClick={() => navigate("/auth")}
        className="px-8 py-6 text-lg rounded-xl
                 bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] hover:from-[#0C93D1] hover:to-[#2DB1DB]
                 shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-[0_0_40px_rgba(14,165,233,0.7)]
                 transform hover:-translate-y-1 transition-all duration-300
                 border border-[#0EA5E9]/50"
      >
        Commencer Maintenant
      </Button>
    </motion.div>
  );
};

export default CallToAction;