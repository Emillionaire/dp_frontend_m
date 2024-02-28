import { IProps, SendChangeForm } from './FileEditorTypes'
import './FileEditor.css'
import React, { BaseSyntheticEvent, useState } from "react"
import { useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import backendUrl from "../../url"
import { AppDispatch } from '../_rtk/store'


export default function FileEditor({data}: IProps) {
  let [edit, setEdit] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  let token = "Bearer " + String(localStorage.getItem('token'))
  let username = data.owner?.username
  let created_at  = new Date(data.created_at)
  let fileUrl = String(data.file)
  let last_download
  const [form, setForm] = useState<SendChangeForm>({
    description: data.description,
    free_file: data.free_file
  })

  if (data.last_download) {
    last_download = new Date(data.last_download)
    last_download = `${created_at.getDate()}.${created_at.getMonth() + 1}.${created_at.getFullYear()}`
  } else {
    last_download = 'Not once'
  }

  function handleOpenFile() {
    let token = "Bearer " + String(localStorage.getItem('token'))
    fetch(fileUrl, {headers: {"Authorization": token}})
    .then(response => response.blob())
    .then(blob => {
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = data.name;
      link.click();

      URL.revokeObjectURL(downloadUrl);
    })
    .catch(() => {
      alert('File unavialable!')
  })}

  async function handleDeleteFile() {
    let response = await fetch(`${backendUrl}api/v1/files/delete/${data.id}`, {headers: {"Authorization": token}, method: 'DELETE'})
    dispatch(fetchGet())
    if (!response.ok) {
      alert('Delete file error!')
    }
  }

  async function handleGetShareLink() {
    console.log(data)
    if (data.free_file === false) {
        alert('This file not free. For free you must change "free file" button.')
    } else {
        const unsecuredCopyToClipboard = (text: string) => {
            const textArea = document.createElement("textarea");
            textArea.value=text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try{document.execCommand('copy')}
            catch(err){console.error('Unable to copy to clipboard',err)}
            document.body.removeChild(textArea)};

        unsecuredCopyToClipboard(`${backendUrl}api/v1/files/freefile/${data.id}`)
        // navigator.clipboard.writeText(`${backendUrl}api/v1/files/freefile/${data.id}`)
        alert(`Link in your clipboard! Use ctrl + v. \nYour link: ${backendUrl}api/v1/files/freefile/${data.id}`)
    }
  }

  async function handleEdit() {
    setEdit((old_state => !old_state))
  }

  function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = element.target
    console.log(name, value)
    
    setForm(PrevForm => ({
        ...PrevForm,
        [name]: value
    }))}

  function handleFreeFileChange(element: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = element.target
    console.log(name, value)
    let avalue = 'false'
    if (value === 'false') {
        avalue = 'true'
    } else {
        avalue = 'false'
    }

    setForm(PrevForm => ({
        ...PrevForm,
        [name]: avalue
    }))
  }

  async function handleSave(_element: BaseSyntheticEvent) {
    const body = {description: form.description, free_file: form.free_file}
    // console.log(body)
    await (await fetch(`${backendUrl}api/v1/files/update/${data.id}/`, {method: 'PATCH', body: JSON.stringify(body),
    headers: {"Authorization": token, 'Content-Type': 'application/json;charset=utf-8'}})).json()
    dispatch(fetchGet())
    setEdit(false)
  }


  const edit_off = (
    <div className="container">
        <span className="subcontainer"><b>ID:</b><br/>{data.id}</span>
        <span className="subcontainer"><b>Name:</b><a onClick={handleOpenFile} className="file"><br/>{data.name}</a></span>
        <span className="subcontainer"><b>Username:</b><br/>{username}</span>
        <span className="subcontainer"><b>Description:</b><br/>{data.description}</span>
        <span className="subcontainer"><b>Size:</b><br/>{data.size}</span>
        <span className="subcontainer"><b>Created at:</b><br/>{`${created_at.getDate()}.${created_at.getMonth() + 1}.${created_at.getFullYear()}`}</span>
        <span className="subcontainer"><b>Last download:</b><br/>{last_download}</span>
        <button className="subcontainer" onClick={handleOpenFile}>Download</button>
        <span className="subcontainer"><b>Free file:</b><br/><input type="checkbox" checked={data.free_file ? 'checked' : undefined} disabled="disabled"/></span>
        <button className="subcontainer" onClick={handleGetShareLink}>Get free link</button>
        <button className="subcontainer" onClick={handleEdit}>Edit</button>
        <button className="subcontainer" onClick={handleDeleteFile}>Delete</button>
    </div>
  )

  const edit_on = (
    <div className="container">
        <span className="subcontainer"><b>ID:</b><br/>{data.id}</span>
        <span className="subcontainer"><b>Name:</b><a onClick={handleOpenFile} className="file"><br/>{data.name}</a></span>
        <span className="subcontainer"><b>Username:</b><br/>{username}</span>
        <span className="subcontainer, editable"><b>Description:</b><br/><input onChange={handleInputChange} type="text" name="description" value={form.description}/></span>
        <span className="subcontainer"><b>Size:</b><br/>{data.size}</span>
        <span className="subcontainer"><b>Created at:</b><br/>{`${created_at.getDate()}.${created_at.getMonth() + 1}.${created_at.getFullYear()}`}</span>
        <span className="subcontainer"><b>Last download:</b><br/>{last_download}</span>
        <span className="subcontainer, editable"><b>Free file:</b><br/>{data.free_file}<input onChange={handleFreeFileChange} type="checkbox" name="free_file" value={form.free_file} checked={data.free_file ? 'checked' : undefined}/></span>
        <button className="subcontainer" onClick={handleGetShareLink}>Get free link</button>
        <button className="subcontainer" onClick={handleEdit}>Cancel</button>
        <button className="subcontainer" onClick={handleSave}>Save</button>
        <button className="subcontainer" onClick={handleDeleteFile}>Delete</button>
    </div>
  )
 
  return (
    <>
      {edit ? edit_on : edit_off}
    </>
  )
  }
