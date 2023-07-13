import "./HomePageImage.scss";

import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";

import Button from "../common/Button";
import {
  createImage,
  uploadFile,
  getHomepageImage,
  updateImage,
} from "../../utils/images/imageApi";
import { Image, Form } from "semantic-ui-react";
const HomePageImage = () => {
  const [fileInfo, setFileInfo] = useState<any>();
  const [newUpload, setNewUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const idToken = useSelector((state: any) => {
    return state.auth.idToken;
  }, shallowEqual);

  useEffect(() => {
    let hasFetched = false;
    const fetchImageUrl = async () => {
      setIsLoading(true);
      try {
        const { item } = await getHomepageImage(idToken);
        if (!hasFetched) {
          setImageUrl(item);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchImageUrl().catch((e) => {
      console.log(e.message);
    });

    return () => {
      hasFetched = true;
    };
  }, [newUpload]);

  const toggleShowUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!fileInfo.file) {
        alert("File should be selected");
        return;
      }

      let uploadInfo;
      if (!imageUrl) {
        uploadInfo = await createImage(idToken);
      } else {
        uploadInfo = await updateImage(idToken);
      }

      await uploadFile(uploadInfo.uploadUrl, fileInfo.file);
      setNewUpload(true);
      setShowUploadForm(false);
      alert("Image was uploaded!");
    } catch (e: any) {
      alert("Could not upload an image: " + e.message);
    } finally {
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setFileInfo({
      file: files[0],
    });
  };

  if (isLoading) {
    return (
      <div className="homepage-image">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="homepage-image">
      {imageUrl && <Image src={imageUrl} size="small" wrapped />}
      <Button
        className={`toggle-button ${showUploadForm ? "active" : ""}`}
        onClick={toggleShowUploadForm}
      >
        {imageUrl ? "Update image" : "Add image"}
      </Button>
      {showUploadForm && (
        <>
          <h2>Upload new image</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <input
                type="file"
                accept="image/*"
                placeholder="Image to upload"
                onChange={handleFileChange}
              />
              <Button type="submit">Upload</Button>
            </Form.Field>
          </Form>{" "}
        </>
      )}
    </div>
  );
};

export default HomePageImage;
