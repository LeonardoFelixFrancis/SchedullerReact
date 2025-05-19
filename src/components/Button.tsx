const Button = ({ children, className = "", ...props }) => {
  const baseStyles = "w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded";
  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
