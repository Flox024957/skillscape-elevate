import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { id: 1, name: "Mindfulness", image: "/placeholder.svg" },
  { id: 2, name: "Productivity", image: "/placeholder.svg" },
  { id: 3, name: "Leadership", image: "/placeholder.svg" },
  { id: 4, name: "Communication", image: "/placeholder.svg" },
  { id: 5, name: "Creativity", image: "/placeholder.svg" },
  { id: 6, name: "Emotional Intelligence", image: "/placeholder.svg" },
  { id: 7, name: "Decision Making", image: "/placeholder.svg" },
  { id: 8, name: "Time Management", image: "/placeholder.svg" },
  { id: 9, name: "Goal Setting", image: "/placeholder.svg" },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-futuristic-black">
      <div className="container px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Welcome to <span className="font-black">FLAP</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Explore skills, set goals, and track your personal development journey
          </p>
          <div className="flex flex-col gap-6 items-center">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-futuristic-blue text-white px-8 py-6 text-lg rounded-lg"
            >
              Get Started
            </Button>
            
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-futuristic-black text-white border border-futuristic-blue px-12 py-6 rounded-xl"
            >
              <span className="text-xl font-bold">
                Tableau de bord
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer bg-futuristic-gray/30 rounded-lg p-6 border border-futuristic-blue/50"
            >
              <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;