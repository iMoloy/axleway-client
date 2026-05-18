import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "AxleWay",
  description: "A clean car rental platform for assignment CAT_05"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div className="page-shell">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastContainer position="top-right" autoClose={2500} />
        </AppProviders>
      </body>
    </html>
  );
}

