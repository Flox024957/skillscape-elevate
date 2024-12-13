import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Skill {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  examples: any[];
  concrete_action: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

interface CategoryContentProps {
  category: Category;
}

export const CategoryContent = ({ category }: CategoryContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Retour
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground mt-2">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.skills?.map((skill) => (
            <Card 
              key={skill.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/skill/${skill.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{skill.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};