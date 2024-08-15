import "./globals.css";

export const metadata = {
  title: "excalidraw clone"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://kit.fontawesome.com/630b01d631.js" crossOrigin="anonymous"></script>
      </head>
      <body className=" h-full font-mono overflow-hidden bg-[#D3CCE3]">{children}</body>
    </html>
  );
}
