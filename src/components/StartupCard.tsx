import { motion } from "framer-motion";
import { Startup } from "@/types/startup";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="surface-card-hover flex flex-col p-6 cursor-default"
    >
      {/* Top: Name + Score Badge */}
      <div className="flex justify-between items-start mb-3">
        <button
          onClick={() => navigate(`/portfolio/${startup.id}`)}
          className="text-left flex-1 min-w-0"
        >
          <h3 className="font-semibold text-lg tracking-tight text-foreground hover:text-primary transition-colors">
            {startup.name}
          </h3>
        </button>
        <ScoreBadge score={startup.score} size="md" />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {startup.tagline}
      </p>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {startup.category}
        </span>
        <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
          {startup.stage}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2 pt-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate(`/portfolio/${startup.id}`)}
          className="flex-1"
        >
          View Portfolio
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/marketing/${startup.id}`)}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Vitrine
        </Button>
      </div>
    </motion.div>
  );
}
