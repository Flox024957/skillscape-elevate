import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { LayoutDashboard } from "lucide-react";

const MainPage = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState("");

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: userNotes } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  // Sample data for the neon graph
  const data = [
    { name: 'Mon', value: Math.random() * 100 },
    { name: 'Tue', value: Math.random() * 100 },
    { name: 'Wed', value: Math.random() * 100 },
    { name: 'Thu', value: Math.random() * 100 },
    { name: 'Fri', value: Math.random() * 100 },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-futuristic-black to-futuristic-black/95">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="futuristic-text">FLAP</span>
          </h1>
          <Button
            onClick={() => navigate("/dashboard")}
            className="glass-panel hover:bg-futuristic-blue/20"
          >
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Button>
        </div>

        {/* Audio Player Section */}
        <div className="glass-panel p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Voice Assistant</h2>
          <AudioPlayer 
            selectedContent={selectedContent}
            userNotes={userNotes}
            onContentSelect={handleContentSelect}
          />
        </div>

        {/* Neon Graph Section */}
        <div className="glass-panel p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#00A3FF" />
                <YAxis stroke="#00A3FF" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9D4EDD"
                  strokeWidth={2}
                  dot={{ fill: '#9D4EDD', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer"
            >
              <div className="glass-panel p-6 hover:scale-105 transition-transform duration-300">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={`https://source.unsplash.com/random/800x800/?tech,${index}`}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-futuristic-black/80 to-transparent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 futuristic-text">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;