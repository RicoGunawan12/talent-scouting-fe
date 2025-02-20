import { Props } from "../props/Props";
import NavigationBar from "../component/NavigationBar";
import Footer from "../component/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div className="min-h-[80vh]">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
