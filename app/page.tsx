import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Courses from "@/components/Courses";
import Process from "@/components/Process";
import Certificate from "@/components/Certificate";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Programs />
        <Courses />
        <Process />
        <Certificate />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
