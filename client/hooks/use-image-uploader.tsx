import { Box, Button, FormControl, FormLabel } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const useImageUploader = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const imgTag = useRef<HTMLImageElement | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setimgUrl] = useState<string | null>(null);
  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onload = () => {
        setimgUrl(reader.result as string);
      };
      reader.readAsDataURL(img);
    }
    console.log(img);
  }, [img]);
  const Component = () => (
    <FormControl>
      <FormLabel htmlFor="filename-input" id="demo-row-radio-buttons-group-label">
        사진
      </FormLabel>
      <Button variant="contained" onClick={() => fileInput.current?.click()}>
        Edit Thumbnail
      </Button>
      <Box style={{ width: 300, aspectRatio: "1", display: "flex", justifyContent: "center" }}>
        <img alt="test" style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }} src={imgUrl || ""} />
      </Box>
      <input
        onChange={(e) => setImg(e.target?.files?.[0] || null)}
        ref={fileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
      />
    </FormControl>
  );
  return { Component, img, imgUrl };
};
export default useImageUploader;
