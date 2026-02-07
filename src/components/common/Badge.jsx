import clsx from "clsx";

const Badge = ({ children, variant = "default", size = "md" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary text-white",
    sale: "bg-red-500 text-white",
    new: "bg-green-500 text-white",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={clsx(
        "inline-block font-semibold rounded",
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
