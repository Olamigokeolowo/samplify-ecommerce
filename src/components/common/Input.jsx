import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  ({ label, error, type = "text", placeholder, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary",
            className,
          )}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
