import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
      className="text-center relative overflow-hidden
               rounded-3xl p-16
               bg-[#0C4A6E]/5 backdrop-blur-md
               border border-[#0369A1]/20
               shadow-[0_0_40px_rgba(3,105,161,0.2)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/5 via-[#8B5CF6]/5 to-[#F97316]/5"></div>
      <h2 className="text-4xl font-bold mb-6 text-white/90 tracking-tight">
        Prêt à Transformer Votre Vie ?
      </h2>
      <p className="text-xl text-gray-300/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
        Rejoignez une communauté de personnes déterminées à passer à l'action et à changer leur vie.
      </p>
      <Button
        onClick={() => navigate("/auth")}
        className="px-8 py-7 text-lg rounded-2xl
                 bg-gradient-to-r from-[#0C4A6E] via-[#8B5CF6] to-[#F97316] hover:from-[#0C4A6E] hover:via-[#7C3AED] hover:to-[#EA580C]
                 shadow-[0_0_30px_rgba(3,105,161,0.3)] hover:shadow-[0_0_50px_rgba(3,105,161,0.5)]
                 transform hover:-translate-y-1 transition-all duration-500
                 border border-[#0369A1]/30 font-medium tracking-wide"
      >
        Commencer Maintenant
      </Button>
    </motion.div>
  );
};

export default CallToAction;