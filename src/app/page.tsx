import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header />

        {/* Content + Footer */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-surface">
            <DashboardContent />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
