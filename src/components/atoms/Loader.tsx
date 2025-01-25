import React from "react";
import loaderImage from "../../assets/prophetlogo.png";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
  alt?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  className = "",
  alt = "Loading...",
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img
        src={loaderImage}
        alt={alt}
        className={`${sizeClasses[size]} animate-spin-slow`}
      />
    </div>
  );
};

export default Loader;
