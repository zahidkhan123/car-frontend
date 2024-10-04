const Input = ({ label, type, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className=" text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
      />
    </div>
  );
  
  export default Input;
  