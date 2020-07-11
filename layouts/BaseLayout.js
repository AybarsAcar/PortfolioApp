import AppNavbar from "../components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "../components/shared/Footer";


//Component is the page youre navigating thru
const BaseLayout = ({ children, page = "" }) => {

  const isHomePage = () => page === "Home";

  return (
      <div className="portfolio-app">
        <AppNavbar />
        {isHomePage() && <Hero />}
        <div className="container">
          {children}
        </div>
        {isHomePage() && <Footer />}
        
      </div>
  );
};


export default BaseLayout;

 
