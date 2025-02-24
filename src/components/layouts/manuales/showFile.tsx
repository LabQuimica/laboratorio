type DriveFileProps = {
    file: {
      id: string;
      name: string;
      mimeType: string;
      webViewLink: string;
    };
  };
  
  const DriveFile = ({ file }: DriveFileProps) => {
    return (
      <li key={file.id}>
        {file.mimeType === "application/pdf" ? (
          <iframe
            src={`https://drive.google.com/file/d/${file.id}/preview`}
            width="100%"
            height="500px"
          />
        ) : (
          <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        )}
      </li>
    );
  };
  
  export default DriveFile;
  