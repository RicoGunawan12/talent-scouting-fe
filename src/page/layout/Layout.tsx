import { Props } from "../props/Props";
import NavigationBar from "../component/NavigationBar";
import Footer from "../component/Footer";
import { Toaster } from "@/components/ui/toaster";

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div className="min-h-[80vh]">{children}</div>
      <div>
        <Footer />
      </div>

      <Toaster />
    </div>
  );
};

export default Layout;
