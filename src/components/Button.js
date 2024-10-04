const Button = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
  
  export default Button;
  