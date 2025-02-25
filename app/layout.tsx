import { Footer, Navbar } from "@/components"; // Imports the Navbar and Footer from your components folder
import "./globals.css"; // Imports global styles for your entire app

// Metadata (SEO)
export const metadata = {
  title: "Car Hub", // Sets the page title in the browser tab
  description: "Discover the best cars in the world.", // Helps with SEO (used by search engines)
  icons: {
    icon: "/logo-icon.png",
  },
};

// This is the main layout component
export default function RootLayout({
  children, // Represents all other pages inside this layout
}: {
  children: React.ReactNode; // TypeScript (children: React.ReactNode) → Ensures children can be any valid React component
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
