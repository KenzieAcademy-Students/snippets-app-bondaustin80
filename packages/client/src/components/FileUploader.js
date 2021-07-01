import axios from "utils/axiosConfig"
import React, { useState } from 'react'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from "hooks/useRequireAuth"
import  Modal  from "react-bootstrap/Modal"

export default function FileUploader() {
    const [newAvatar, setNewAvatar] = useState()
    const [show, setShow] = useState(false)
    const { state } = useProvideAuth()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
        setShow(false)
    }

    function onChange(e) {
        setNewAvatar(e.target.files[0])
    }

    return (
        <>
        <button onClick={handleShow}>Change Avatar</button>

        <Modal show={show}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>File Upload</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input type="file" className="custom-file-input" name="myFile" onChange={onChange}/>
            </Modal.Body>

            <Modal.Footer>
                <button variant="primary" className="upload-button" type="submit" onClick={onFileSubmit}>Upload Avatar</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}