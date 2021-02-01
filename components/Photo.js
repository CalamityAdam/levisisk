import Image from 'next/image';

const Photo = ({ photo }) => (
  <Image src={photo.url} width={photo.width} height={photo.height} />
);

export default Photo;
