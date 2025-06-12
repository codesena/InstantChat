export const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "InstantChat");
  data.append("cloud_name", "senatenikhil");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/senatenikhil/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    if (!res.ok) throw new Error("Upload failed");
    const imageUrl = (await res.json()).secure_url;
    console.log("url", imageUrl);
    return imageUrl;
  } catch (err) {
    console.error("Upload Error:", err);
  }
};
