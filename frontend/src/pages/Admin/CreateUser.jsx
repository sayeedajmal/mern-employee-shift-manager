import { useState } from "react";
import { useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import Input from "../../Inputs/Input";
import DashboardLayout from "../../components/DashboardLayout";

const CreateUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name) {
      toast.error("Please enter the full name");
      return;
    }

    if (!password) {
      toast.error("Please enter the password");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: name,
        email,
        password,
        team,
      });

      const { token } = response.data;

      if (token) {
        navigate("/admin/users");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <DashboardLayout activeMenu="Create User">
      <div className="lg:w-[80%] h-auto md:h-full m-auto mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">
          Create Team Member
        </h3>
        <p className="text-sx text-slate-700 mt-[5px] mb-6">
          Please enter the details
        </p>

        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              placeholder="Max Mustermann"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="max@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Min. 8 characters"
              type="password"
            />

            <div>
              <label className="text-[13px] text-slate-800">Team</label>
              <div className="input-box">
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Please select</option>
                  <option value="sozialbetreuer">Social Assistant</option>
                  <option value="sozialarbeiter">Social Worker</option>
                  <option value="sozialbetreuerhelfer">
                    Assistant Social Worker
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateUsers;
