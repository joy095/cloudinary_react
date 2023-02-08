import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

const Home = () => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <h1>Home</h1>

      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName="test-2"
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </div>
  );
};

export default Home;
