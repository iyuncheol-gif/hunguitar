import Home from "@/_components/home";
import Services from "@/_components/services";
import Programs from "@/_components/programs";
import Gallery from "@/_components/gallery";
import Lesson from "@/_components/lesson";
import Pricing from "@/_components/pricing";
import Contents from "@/_components/contents";
import OurStudents from "@/_components/our-students";
import Contact from "@/_components/contact";

export default function Page() {
  return (
    <>
      <Home />
      <Services />
      <Programs />
      <Gallery />
      <Lesson />
      <Pricing />
      <Contents />
      <OurStudents />
      <Contact />
    </>
  );
}
