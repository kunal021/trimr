import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container px-14">
        <Header />
        <Outlet />
      </main>
      <footer className="p-3 text-lg font-semibold text-center bg-slate-900 text-white mt-5">
        Made With 💖 By Kunal
      </footer>
    </div>
  );
};

export default AppLayout;
