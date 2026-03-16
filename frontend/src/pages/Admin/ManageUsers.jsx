import DashboardLayout from "../../components/DashboardLayout";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCards";
import { RiResetLeftFill } from "react-icons/ri";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [teamFilter, setTeamFilter] = useState("all");
  const [workFilter, setWorkFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (response.data?.users?.length > 0) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      toast.error("Error fetching users:", error);
    }
  };

  const handleFilter = () => {
    let filtered = allUsers;
    if (teamFilter !== "all") {
      filtered = filtered.filter((user) => user.team === teamFilter);
    } else {
      filtered = filtered.filter((user) => user.team);
    }
    if (workFilter !== "all") {
      filtered = filtered.filter((user) => user.workType === workFilter);
    } else {
      filtered = filtered.filter((user) => user.workType);
    }
    if (activeFilter === "active") {
      filtered = filtered.filter((user) => user.isActive);
    } else if (activeFilter === "deactive") {
      filtered = filtered.filter((user) => !user.isActive);
    } else {
      filtered = filtered.filter((user) => user.isActive !== "");
    }
    return filtered;
  };

  const handleReset = () => {
    setTeamFilter("all");
    setWorkFilter("all");
    setActiveFilter("all");
  };

  useEffect(() => {
    handleFilter();
  }, [teamFilter, workFilter, activeFilter]);

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <span className="select-boxx" aria-live="polite">{`Count: ${
              handleFilter()?.length
            }`}</span>
            <select
              className="select-boxx focus:ring-2 focus:ring-primary"
              onChange={(e) => setTeamFilter(e.target.value)}
              value={teamFilter}
              aria-label="Filter by team"
            >
              <option value="all">All Teams</option>
              <option value="sozialarbeiter">Social Worker</option>
              <option value="sozialbetreuer">Social Assistant</option>
              <option value="sozialbetreuerhelfer">Assistant Social Worker</option>

            </select>
            <select
              className="select-boxx focus:ring-2 focus:ring-primary"
              onChange={(e) => setWorkFilter(e.target.value)}
              value={workFilter}
              aria-label="Filter by work type"
            >
              <option value="all">All Work Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>

            </select>
            <select
              className="select-boxx focus:ring-2 focus:ring-primary"
              onChange={(e) => setActiveFilter(e.target.value)}
              value={activeFilter}
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="deactive">Inactive</option>

            </select>
            {(teamFilter !== "all" || workFilter !== "all") && (
              <button
                className="flex md:flex download-btn shadow-sm focus:ring-2 focus:ring-primary"
                onClick={handleReset}
                aria-label="Reset Filter"
              >
                <RiResetLeftFill className="text-lg" />
                Reset
              </button>

            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {handleFilter()?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
