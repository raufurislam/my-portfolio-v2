import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Code2 className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Project Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/projects">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
