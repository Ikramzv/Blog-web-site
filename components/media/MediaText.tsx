import { FaCloudUploadAlt } from "react-icons/fa"

type MediaTextProps = {
    uploadAsset: any
    assetType: string
}

function MediaText({ uploadAsset, assetType }: MediaTextProps) {
  return (
    <label className="cursor-pointer" >
        <div className="flex flex-col items-center justify-center h-full" >
            <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-xl" >
                    <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                </p>
                <p className="text-sm font-semibold text-center">
                    Select a {assetType} and share with your friends
                </p>
            </div>
            <p className="text-sm mt-5 text-gray-400 text-center leading-10" >
                {assetType === 'video' ? 'MP4 or WebM or ogg' : 'JPG or WEBP or PNG'} <br />
                720x1280 or higher <br />
                {assetType === 'video' && (
                    <>
                        Up to 10 minutes
                        <br />
                    </>
                )}
                Less than 2gb
            </p>
            <p className="bg-[#f51997] text-center mt-10 rounded text-white text-base font-medium p-2 w-52 outline-none">
                Select File
            </p>
        </div>
        <input 
            type="file"
            name="upload_video"
            className="w-0 h-0"
            onChange={uploadAsset}
        />
    </label>
  )
}

export default MediaText