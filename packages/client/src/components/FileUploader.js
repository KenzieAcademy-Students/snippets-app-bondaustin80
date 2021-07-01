import axios from "utils/axiosConfig"
import React, { useState } from 'react'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from "hooks/useRequireAuth"

export default function FileUploader() {
    const [newAvatar, setNewAvatar] = useState()
    const { state } = useProvideAuth()

    const {
        state: { user },
    } = useRequireAuth()

    const onFileSubmit = async (e) => {
        e.preventDefault();
        console.log(newAvatar)
        console.log(user)
        const formData = new FormData();
        formData.append('myFile', newAvatar)
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        };
        axios.post(`/upload/${user.uid}`, formData, config.headers).then((response) => {
            alert("File uploaded successfully")
        }).catch((error) => {
            console.log("Error occurred")
        });
    }

    function onChange(e) {
        setNewAvatar(e.target.files[0])
    }

    return (
        <form class="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
            <h1>File Upload</h1>
            <input type="file" className="custom-file-input" name="myFile" onChange={onChange}/>
            <button className="upload-button" type="submit" onClick={onFileSubmit}>Upload Avatar</button>
        </form>
    )
}