import { Inter, Outfit } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import "@/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "AxleWay – Premium Car Rental Platform",
  description:
    "AxleWay connects trusted car owners with verified renters. Explore hundreds of reliable cars or start hosting your own today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <AppProviders>
          <div className="page-shell">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToastContainer position="bottom-right" />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
