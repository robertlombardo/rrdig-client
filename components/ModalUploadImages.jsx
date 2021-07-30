import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import apolloClient from '../apollo-client'
import { Input, Button, Modal, Tag, Tooltip, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'

const uploadImageMutation = gql`
mutation ($file: Upload!, $tags: [String!]!) {
  uploadImage(file: $file, tags: $tags) {
    filename
    mimetype
    encoding
  }
}`

const DEFAULT_TAGS_STATE = {
  tags: [],
  inputVisible: false,
  inputValue: '',
  editInputIndex: -1,
  editInputValue: '',
}
let _input, _editInput

export default function Home(props) {
  const [fileList, setFileList] = useState()
  const [uploadMutation] = useMutation(uploadImageMutation)

  const dispose = () => {
    setTagState(DEFAULT_TAGS_STATE)
    setFileList([])
    props.onCancel()
  }

  const uploadEleProps = {
    listType: 'picture',
    beforeUpload: file => {
      const isImg = file.type.startsWith('image')

      if (!isImg) {
        message.error(`${file.name} is not an image file`);
      }
      return isImg ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setFileList(info.fileList)
    }
  };

  const uploadImages = async () => {
    for (const { originFileObj } of fileList) {
      const uploadedFile = await uploadMutation({
        variables: {
          file: originFileObj,
          tags: tagState.tags
        }
      })
    }

    dispose()
  }

  // tags stuff
  const [tagState = DEFAULT_TAGS_STATE, setTagState] = useState()


  const handleClose = removedTag => {
    const tags = tagState.tags.filter(tag => tag !== removedTag)
    setTagState({ ...tagState, tags })
  };

  const showInput = async () => {
    await setTagState({ ...tagState, inputVisible: true })
    if (_input) {
      _input.focus()
    }
  };

  const handleInputChange = e => {
    setTagState({ ...tagState, inputValue: e.target.value })
  };

  const handleInputConfirm = () => {
    const { inputValue } = tagState;
    let { tags } = tagState;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    setTagState({ ...tagState, tags, inputVisible: false, inputValue: '' })
  }

  const handleEditInputChange = e => {
    setTagState({ ...tagState, editInputValue: e.target.value })
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tagState.tags]
    newTags[editInputIndex] = tagState.editInputValue

    setTagState({
      ...tagState,
      tags: newTags,
      editInputIndex: -1,
      editInputValue: ''
    })
  }

  const saveInputRef = input => {
    _input = input;
    // setTagState({ ...tagState, input })
  };

  const saveEditInputRef = editInput => {
    _editInput = input;
    // setTagState({ ...tagState, editInput })
  };

  return (
    <Modal
      title="Upload an Image"
      visible={props.show}
      onCancel={dispose}
      onOk={uploadImages}
    >
      <Upload {...uploadEleProps} multiple accept="image/*">
        <Button icon={<UploadOutlined />}>Select image file(s) to upload</Button>
      </Upload>
      <br />
      <br />
      <div>Add Tags:</div>
      {tagState.tags.map((tag, index) => {
        if (tagState.editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={tagState.editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                setTagState({
                  ...tagState,
                  editInputIndex: index,
                  editInputValue: tag
                })
                e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {tagState.inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={tagState.inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!tagState.inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </Modal>
  )
}
