import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["skillchain-leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("game_leaderboards")
        .select(`
          score,
          profiles (
            pseudo
          )
        `)
        .eq("game_type", "skill-chain")
        .order("score", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Meilleurs scores
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Rang</TableHead>
            <TableHead>Joueur</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.map((entry, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b"
            >
              <TableCell className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell>
                {entry.profiles?.pseudo || "Joueur anonyme"}
              </TableCell>
              <TableCell className="text-right">
                {entry.score}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};