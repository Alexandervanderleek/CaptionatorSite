import DemoSection from "../components/DemoSection";
import PageHeader from "../components/PageHeader";
import UploadForm from "../components/UploadForm";

export default function Home() {
  

  return (
    <>
      <PageHeader
        MainTitle="Add Epic Captions To Your Videos"
        secondTitle="Just Upload And We Do The Rest"
      />

      <div className="text-center">
        <UploadForm></UploadForm>
      </div>

      <DemoSection />
    </>
  );
}
