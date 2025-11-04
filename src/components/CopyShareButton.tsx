import React, { useState } from "react";
import Button from "./ui/Button";

type Props = {
  shareLink: string|null; // Your shareable URL
};

const CopyShareLinkButton: React.FC<Props> = ({ shareLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200); // show "Copied!" briefly
    } catch (err) {
        
      alert("Failed to copy link!"+String(err));
    }
  };

  return (
    <Button
      className=" font-bold w-full "
      variant="primary"
      size="md"
      text={copied ? "Copied!" : "Copy Share Link"}
      onClick={handleCopy}
    />
  );
};

export default CopyShareLinkButton;
