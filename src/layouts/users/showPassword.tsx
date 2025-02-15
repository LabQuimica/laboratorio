import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordCell = ({ password }: { password: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <p className="text-center">{showPassword ? password : "******"}</p>
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordCell;
