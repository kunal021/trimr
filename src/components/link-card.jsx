/* eslint-disable react/prop-types */
import { Copy, Download, Loader, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";

const LinkCard = ({ url = [], fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-100 rounded-lg">
      <img
        src={url.qr}
        alt={"qr code"}
        className="h-32 object-contain ring ring-blue-500 self-start"
      />
      <Link
        to={`/link/${url.id}`}
        className="flex flex-col flex-wrap text-wrap flex-1"
      >
        <span className="text-3xl font-extrabold hover:underline cursor-pointer break-words">
          {url.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer break-all">
          https://trimr.netlify.app/
          {url.custom_url ? url.custom_url : url.short_url}
        </span>
        <span className="flex items-center flex-wrap gap-1 hover:underline cursor-pointer break-all">
          {url.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            navigator.clipboard.writeText(
              `https://trimr.netlify.app/${
                url.custom_url ? url.custom_url : url.short_url
              }`
            )
          }
          variant={"ghost"}
        >
          <Copy />
        </Button>
        <Button variant={"ghost"} onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            <Trash2 />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
