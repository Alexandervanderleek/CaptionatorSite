import DemoSection from "./components/DemoSection";
import PageHeader from "./components/PageHeader";
import UploadIcon from "./components/uploadIcon";

export default function Home() {
  return (
    <>
      <PageHeader MainTitle="Add Epic Captions To Your Videos" secondTitle="Just Upload And We Do The Rest"/>

      <div className="text-center">
        <button className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50">
          <UploadIcon />
          <span>Choose file</span>
        </button>
      </div>

      <DemoSection/>
    </>
  );
}
