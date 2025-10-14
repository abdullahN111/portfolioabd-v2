import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4 animate-fade-in">404</h1>
      <p className="text-lg text-muted-foreground mb-6 animate-fade-in-delay-1">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="cosmic-button animate-fade-in-delay-2">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
