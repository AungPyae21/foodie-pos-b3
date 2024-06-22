import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (files: File[]) => void;
}

const FileDrop = ({ onDrop }: Props) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "4px dotted lightgrey",
        p: 1,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDrop;
