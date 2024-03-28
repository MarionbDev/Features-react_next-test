import dynamic from "next/dynamic";

export default function ViewMap() {
  const Map = dynamic(() => import("./Map"), {
    ssr: false,
  });

  return (
    <>
      <Map />
    </>
  );
}
