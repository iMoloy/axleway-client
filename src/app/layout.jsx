import { Inter, Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "AxleWay | Premium Car Rental Platform",
  description:
    "Rent verified cars or host your own vehicle. AxleWay connects trusted owners with verified renters for a seamless car rental experience.",
  keywords: ["car rental", "rent a car", "host a car", "AxleWay"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <div className="page-shell">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="dark"
          />
        </AppProviders>
      </body>
    </html>
  );
}
