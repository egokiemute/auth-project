import { Users } from "lucide-react";
import Summary from "../components/admin/Summary";
import AllReservation from "../components/admin/AllReservation";
import AllUsers from "../components/admin/AllUsers";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { allTabs, fetchAllTabs } = useAuthStore();

  useEffect(() => {
    fetchAllTabs(); // Fetch tabs when the component mounts
  }, []);

  console.log(allTabs);
  // const { fet } = useAuthStore
  //   const fetchTabs = async () => {
  //     try {
  //         const response = await fetch('http://localhost:8000/api/auth/tabs');
  //         const data = await response.json();
  //         console.log('Tabs:', data);
  //     } catch (error) {
  //         console.error('Error fetching tabs:', error);
  //     }
  // };

  // fetchTabs();

  return (
    <div className="container">
      <h1 className="my-4 text-2xl font-bold">Admin Dashboard</h1>
      <Summary />
      {/* <AllReservation /> */}
      <AllUsers />
      {/* Add admin-specific functionality here */}
    </div>
  );
};

export default AdminDashboard;
