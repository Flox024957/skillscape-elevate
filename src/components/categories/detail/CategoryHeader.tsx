import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryHeaderProps {
  name: string;
}

export const CategoryHeader = ({ name }: CategoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        {name}
      </h1>
    </div>
  );
};