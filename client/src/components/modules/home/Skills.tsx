import Image from "next/image";

export default function Skills() {
  return (
    <div>
      <h1>This is Skills component</h1>
      <Image
        src="https://skillicons.dev/icons?i=typescript"
        alt="Description of the image"
        width={500}
        height={300}
      />
    </div>
  );
}
