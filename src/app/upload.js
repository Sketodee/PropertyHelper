import axios from "axios";

export const uploadCloudinary = async (file) => {
    const formData = new FormData()
    const preset_key = 'wifofnph'
    const cloud_name = 'drrbebmby'
    formData.append("file", file)
    formData.append("upload_preset", preset_key)
    const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    // return {publicId: data?.public_id, url: data?.secure_url}
    return data?.secure_url
}