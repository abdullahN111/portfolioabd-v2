import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <SEO title="404 — Page Not Found" />
      <span className="text-6xl sm:text-7xl font-extrabold text-primary mb-3">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-6 text-sm sm:text-base">
        The page you are looking for might have been moved or doesn&apos;t
        exist.
      </p>
      <Link to="/" className="cosmic-button">
        <ArrowLeft className="h-4 w-4" />
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
