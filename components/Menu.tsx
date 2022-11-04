import Link from 'next/link';

export default function Menu() {
  return (
    <div>
      Menu: <Link href="/">Home</Link>
      {' | '}
      <Link href={`/Appliances`}>Appliances</Link> {' | '}
      <Link href={`/Audio`}>Audio</Link> {' | '}
      <Link href={`/Cell%20Phones`}>Cell Phones</Link> {' | '}
      <Link href={`/Housewares`}>Housewares</Link> {' | '}
      <Link href={`/Musical%20Instruments`}>Musical Instruments</Link> <br />
      <br />
    </div>
  );
}
