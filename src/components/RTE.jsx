import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../config/config'


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
      <Editor
      apiKey='il7as3tnlwo7tmti8aepj4snovvt9o3qsx1hrehohwzft7x1'
      initialValue={defaultValue}
      init={{
        height: 500,
        menubar: true,
        skin: 'oxide-dark', // Dark UI
        content_css: 'dark', // Dark content
        plugins: [
          "image", "advlist", "autolink", "lists", "link", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "help", "wordcount"
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        content_style: `
          body {
            background-color: #0f172a; 
            color: white;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
            padding: 16px;
          }
        `
      }}
      onEditorChange={onChange}
    />
    
    )}
    />

     </div>
  )
}