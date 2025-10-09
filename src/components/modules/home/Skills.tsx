import Image from "next/image";

export default function Skills() {
  return (
    <div>
      <h1>This is Skills component</h1>

      <Image
        src="https://skillicons.dev/icons?i=typescript"
        alt="TypeScript Icon"
        width={100}
        height={100}
        unoptimized
      />
      <Image
        src="https://skillicons.dev/icons?i=javascript"
        alt="JavaScript Icon"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
}
