import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/src/redux/reducer";
import { UserAvatar } from "../userAvatar";
import { Button, Form, Input, Upload, message } from "antd";
import variables from '@/src/styles/variable.module.scss'
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";


export const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch()

    const [isImage, setIsImage] = useState(false)
    const [post, setPost] = useState('')
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const { _id } = user;
    const token = useSelector((state) => state.auth.token);
    const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app'
    const { Dragger } = Upload;
    const [form] = useForm();

    const props = {
        name: 'picturePath',
        multiple: false,
        accept: "image/png, image/jpeg, image/jpg",
        style: {
            width: '100%'
        },
        maxCount: 1,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        const fileList = e && e.fileList;

        // Update the imageFile state
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;


            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(file);
                setImageBase64(reader.result);
            };
        } else {
            setImage(null);
            setImageBase64(null);
        }

        return fileList;
    };
    const resetFormFields = () => {
        form.resetFields();
        setPost("");
        setImage(null);
        setImageBase64(null);
    };

    const handlePost = async () => {
        try {
            const formData = new FormData();
            formData.append("userId", _id);
            formData.append("description", post);

            if (imageBase64) {
                formData.append("picturePath", imageBase64);
            }

            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const posts = await response.json();
                dispatch(setPosts({ posts }));
                resetFormFields();
            } else {
                console.error("Failed to post");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center gap-3">
                <UserAvatar image={picturePath} />
                <div style={{ width: '90%' }}>
                    <Form onFinish={handlePost} form={form} className="d-flex align-items-center">
                        <Form.Item name='description' style={{width: '100%', marginBottom: '0'}}>
                            <Input className="input-post" placeholder="What's up! Tell something new..." size="large" style={{ width: '90%', background: variables.primaryColor, border: 'none', color: variables.secondColor }} onChange={(e) => setPost(e.target.value)} value={post} />
                        </Form.Item>
                        {/* <Form.Item
                            name="picturePath"
                            valuePropName="imageFile"
                            getValueFromEvent={normFile}
                            className="d-flex justify-content-center w-100 upload-post"
                        >
                            <Dragger {...props} style={{ width: '100%' }} className="upload__hover">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ color: variables.mainColor }} />
                                </p>
                                <p className="ant-upload-text" style={{ color: variables.secondColor }}>Click or drag image to this area to upload</p>
                                <p className="ant-upload-hint" style={{ color: variables.secondColor }}>
                                    Strictly prohibited from uploading company data or other banned files.
                                </p>
                            </Dragger>
                        </Form.Item> */}
                        <Form.Item className="d-flex justify-content-end m-0">
                            <Button type="primary" htmlType="submit" className="primary-hover">
                                <span style={{ color: variables.primaryColor }}>Boo!</span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}